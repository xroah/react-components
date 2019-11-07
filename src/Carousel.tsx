import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import CarouselItem from "./CarouselItem"
import {emulateTransitionEnd, reflow} from "./utils";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    animation?: "slide" | "fade";
    controls?: boolean;
    indicators?: boolean;
    activeIndex?: number;
    interval?: number;
}

export default class Carousel extends React.Component<CarouselProps> {

    static propTypes = {
        animation: PropTypes.oneOf(["slide", "fade"]),
        controls: PropTypes.bool,
        indicators: PropTypes.bool,
        activeIndex: PropTypes.number,
        interval: PropTypes.number
    };
    static defaultProps = {
        animation: "slide",
        controls: true,
        indicators: true,
        activeIndex: 0,
        interval: 3000
    };
    static Item = CarouselItem;

    state = {
        prevIndex: -1,
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
        const PREFIX = "carousel-item";
        const children = this.getChildren();
        let {
            currentIndex,
            prevIndex
        } = this.state;
        let el = children[currentIndex];
        let prevEl = children[prevIndex];
        let clsMap = {
            prev: "right",
            next: "left"
        };
        let cls1 = `${PREFIX}-${this.dir}`;
        let cls2 = `${PREFIX}-${clsMap[this.dir]}`;

        if (!el) return;

        if (!this.dir) {
            prevEl && prevEl.classList.remove("active");
            return el.classList.add("active");
        }

        if (prevEl) {
            prevEl.classList.add(cls2);
            emulateTransitionEnd(prevEl, () => {
                prevEl.classList.remove(cls2, "active");
            });
        }

        this.transitioning = true;

        el.classList.add(cls1);
        reflow(el);
        el.classList.add(cls2);
        emulateTransitionEnd(el, () => {
            this.transitioning = false;
            el.classList.remove(cls1, cls2);
            el.classList.add("active");
        });
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

    to(index: number, dir = "next") {
        let childrenLen = this.getChildren().length;
        let {currentIndex} = this.state;

        if (this.transitioning) return;

        if (index >= childrenLen) {
            index = 0;
        } else if (index < 0) {
            index = childrenLen - 1;
        }

        if (index === currentIndex) return;

        //component just mount
        if (currentIndex === -1) {
            this.dir = "";
        } else {
            this.dir = dir;
        }

        this.setState({
            currentIndex: index,
            prevIndex: currentIndex
        });

    }

    toPrev() {
        let {currentIndex} = this.state;
        this.to(--currentIndex, "prev");
    }

    toNext() {
        let {currentIndex} = this.state;
        this.to(++currentIndex, "next");
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
            animation,
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
                    animation === "fade" && "carousel-fade",
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