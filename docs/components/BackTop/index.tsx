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
        window.addEventListener("wheel", this.handleWheel);
    }

    handleScroll = () => {
        if (this.timer !== null) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.toggleVisible();
        this.timer = setTimeout(this.handleScroll, 100);
    }

    handleWheel = () => {
        if (this.scrollTimer !== null) {
            cancelAnimationFrame(this.scrollTimer);
            this.scrollTimer = null;
        }     
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

        if (scrollTop > 5) {
            this.scrollTimer = requestAnimationFrame(this.scrollToTop);
        } else {
            window.scrollTo(0, 0);
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