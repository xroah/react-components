import * as React from "react";
import Fade from "../../../components/Fade";
import { scrollTo } from "../../scrollIntoView";

interface State {
    visible?: boolean;
}

export default class BackTop extends React.Component<React.HTMLAttributes<HTMLElement>, State> {
    private timer: any = null;
    state = {
        visible: false
    };

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.toggleVisible();
        this.timer = setTimeout(this.handleScroll, 100);
    }
    
    getScrollTop() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    toggleVisible() {
        const scrollTop = this.getScrollTop();
        this.setState({
            visible: scrollTop > window.innerHeight / 2
        });
    };

    handleClick = (evt: React.MouseEvent) => {
        scrollTo(0);
        evt.preventDefault();
    }

    render() {
        return (
            <Fade in={this.state.visible}>
                <a
                onClick={this.handleClick} 
                href="#" 
                className="back-to-top"/>
            </Fade>
        );
    }
}