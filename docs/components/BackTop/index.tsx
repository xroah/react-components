import * as React from "react";
import Fade from "../../../components/Fade";

interface State {
    visible?: boolean;
}

export default class BackTop extends React.Component<React.HTMLAttributes<HTMLElement>, State> {
    private timer: any = null;
    private scrollTimer: any = null;
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

        /* if (this.scrollTimer !== null) {
            cancelAnimationFrame(this.scrollTimer);
            this.scrollTimer = null;
        }  */       
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

    scrollToTop = () => {
        const scrollTop = this.getScrollTop();

        window.scrollTo(0, scrollTop - (scrollTop / 10));

        if (scrollTop > 0) {
            this.scrollTimer = requestAnimationFrame(this.scrollToTop);
        }
    };

    handleClick = (evt: React.MouseEvent) => {
        this.scrollToTop();
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