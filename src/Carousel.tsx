import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import CarouselItem from "./CarouselItem"
import {emulateTransitionEnd} from "./utils";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    slide?: boolean;
    fade?: boolean;
    controls?: boolean;
    indicators?: boolean;
    activeIndex?: number;
    interval?: number;
}

export default class Carousel extends React.Component<CarouselProps> {

    static propTypes = {
        slide: PropTypes.bool,
        fade: PropTypes.bool,
        controls: PropTypes.bool,
        indicators: PropTypes.bool,
        activeIndex: PropTypes.number,
        interval: PropTypes.number
    };
    static defaultProps = {
        slide: true,
        fade: false,
        controls: true,
        indicators: true,
        activeIndex: 0,
        interval: 3000
    };
    static Item = CarouselItem;

    state = {
        currentIndex: -1
    };
    el: React.RefObject<HTMLDivElement> = React.createRef();
    timer = null;
    dir: string = "";
    transitioning: boolean = false;

    componentDidMount() {
        this.to(this.props.activeIndex as number);
    }

    componentDidUpdate() {
        const children = this.getChildren();
        let el = children[this.state.currentIndex];

        if (!el) return;

        if (this.dir) {
            this.transitioning = this.props.slide as boolean;
        } else {
            el.classList.add("active");
        }
    }

    renderIndicators(children: Array<React.ReactNode>) {
        const {
            currentIndex
        } = this.state;
        return (
            <ol className="carousel-indicators">
                {
                    children.map(
                        (c, i) => <li
                            key={i}
                            className={classNames(currentIndex === i && "active")}/>
                    )
                }
            </ol>
        );
    }

    to(index: number) {
        let childrenLen = this.getChildren().length;
        let {currentIndex} = this.state;

        if (this.transitioning) return;

        if (index >= childrenLen) {
            index = childrenLen - 1;
        } else if (index < 0) {
            index = 0;
        }

        if (index === currentIndex) return;

        //component just mount
        if (currentIndex === -1) {
            this.dir = "";
        } else if (currentIndex > index) {
            this.dir = "prev";
        } else {
            this.dir = "next";
        }

        this.setState({
            currentIndex: index
        });

    }

    toPrev() {
        let {currentIndex} = this.state;
        this.to(--currentIndex);
    }

    toNext() {
        let {currentIndex} = this.state;
        this.to(++currentIndex);
    }

    handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
        const hash = (evt.target as HTMLAnchorElement).hash;
        if (hash === "#prev") {
            this.toPrev();
        } else {
            this.toNext();
        }
        evt.preventDefault();
    };

    getChildren() {
        let el = this.el.current;

        if (!el) return [];

        return Array.from(el.children);
    }

    renderControls() {
        return (
            <>
                <a
                    className="carousel-control-prev"
                    href="#prev"
                    onClick={this.handleClick}>
                    <span className="carousel-control-prev-icon"/>
                </a>
                <a
                    className="carousel-control-next"
                    href="#next"
                    onClick={this.handleClick}>
                    <span className="carousel-control-next-icon"/>
                </a>
            </>
        );
    }

    render() {
        const {
            className,
            slide,
            fade,
            controls,
            indicators,
            children,
            activeIndex,
            ...otherProps
        } = this.props;

        const _children = React.Children.toArray(children);

        return (
            <div className={
                classNames(
                    className,
                    slide && "slide",
                    fade && "carousel-fade",
                    "carousel "
                )
            } {...otherProps}>
                {indicators && this.renderIndicators(_children)}
                <div className="carousel-inner" ref={this.el}>
                    {
                        _children.map((c, i) => {
                            if (!React.isValidElement(c) || c.type !== CarouselItem) return;

                            return React.cloneElement(
                                c,
                                {
                                    key: i
                                }
                            );
                        })
                    }
                </div>
                {controls && this.renderControls()}
            </div>
        );
    }

}