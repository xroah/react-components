import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import CarouselItem from "./CarouselItem"
import {emulateTransitionEnd, handleFuncProp, reflow} from "./utils";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    animation?: "slide" | "fade";
    controls?: boolean;
    indicators?: boolean;
    activeIndex?: number;
    interval?: number;
    pauseOnHover?: boolean;
    onSlide?: Function;
    onSlid?: Function;
}

export default class Carousel extends React.Component<CarouselProps> {

    static propTypes = {
        animation: PropTypes.oneOf(["slide", "fade"]),
        controls: PropTypes.bool,
        indicators: PropTypes.bool,
        activeIndex: PropTypes.number,
        interval: PropTypes.number,
        pauseOnHover: PropTypes.bool,
        onSlide: PropTypes.func,
        onSlid: PropTypes.func
    };
    static defaultProps = {
        animation: "slide",
        controls: true,
        indicators: true,
        activeIndex: 0,
        interval: 5000,
        pauseOnHover: true
    };
    static Item = CarouselItem;

    state = {
        prevIndex: -1,
        currentIndex: -1
    };

    private el: React.RefObject<HTMLDivElement> = React.createRef();
    private timer: any = null;
    private dir: string = "";
    transitioning: boolean = false;

    componentDidMount() {
        this.to(this.props.activeIndex as number);
        this.start();
    }

    componentDidUpdate() {
        const PREFIX = "carousel-item";
        const children = this.getChildren();
        let {
            state: {
                currentIndex,
                prevIndex
            },
            props: {
                onSlide,
                onSlid
            }
        } = this;
        let el = children[currentIndex] as HTMLElement;
        let prevEl = children[prevIndex] as HTMLElement;
        let clsMap: any = {
            prev: "right",
            next: "left"
        };
        let cls1 = `${PREFIX}-${this.dir}`;
        let cls2 = `${PREFIX}-${clsMap[this.dir]}`;

        if (!el) return;

        //component just mounted
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
        onSlide = handleFuncProp(onSlide);

        el.classList.add(cls1);
        reflow(el);
        onSlide();
        el.classList.add(cls2);
        emulateTransitionEnd(el, () => {
            onSlid = handleFuncProp(onSlid);

            this.transitioning = false;
            el.classList.remove(cls1, cls2);
            el.classList.add("active");
            onSlid()
        });
    }

    to(index: number, dir?: string) {
        let childrenLen = this.getChildren().length;
        let {currentIndex} = this.state;

        if (this.transitioning || childrenLen <= 1) return;

        //cycle
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
            if (!dir) {
                this.dir = index < currentIndex ? "prev" : "next";
            } else {
                this.dir = dir;
            }
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

    cycle = () => {
        this.timer = setTimeout(() => {
            this.toNext();
            this.cycle();
        }, this.props.interval);
    }

    start() {
        let children = this.getChildren();

        children.length > 1 && this.cycle();
    }

    toNext() {
        let {currentIndex} = this.state;
        this.to(++currentIndex, "next");
    }

    handleClickControl = (evt: React.MouseEvent) => {
        const hash = (evt.target as HTMLAnchorElement).hash;

        if (hash === "#prev") {
            this.toPrev();
        } else {
            this.toNext();
        }

        evt.preventDefault();
    }

    handleClickIndicator = (evt: React.MouseEvent) => {
        let tgt = evt.target as HTMLElement;
        let index = parseInt(tgt.dataset.index as any);

        this.to(index);
    }

    handleMouseOver = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    handleMouseOut = () => {
        this.start();
    }

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
                    onClick={this.handleClickControl}>
                    <span className="carousel-control-prev-icon"/>
                </a>
                <a
                    className="carousel-control-next"
                    href="#next"
                    onClick={this.handleClickControl}>
                    <span className="carousel-control-next-icon"/>
                </a>
            </>
        );
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
                            data-index={i}
                            onClick={this.handleClickIndicator}
                            className={classNames(currentIndex === i && "active")}/>
                    )
                }
            </ol>
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
            onSlide,
            onSlid,
            pauseOnHover,
            ...otherProps
        } = this.props;

        const _children = React.Children.toArray(children);

        if (pauseOnHover) {
            otherProps.onMouseOver = this.handleMouseOver;
            otherProps.onMouseOut = this.handleMouseOut;
        }

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