import * as React from "react";
import PropTypes from "prop-types";
import {
    emulateTransitionEnd,
    handleFuncProp,
    reflow,
    classNames
} from "../../utils";
import { CommonProps } from "../../CommonPropsInterface";

export interface CarouselProps extends CommonProps<HTMLDivElement> {
    animation?: "slide" | "fade";
    controls?: boolean;
    indicators?: boolean;
    activeIndex?: number;
    interval?: number;
    pauseOnHover?: boolean;
    onSlide?: Function;
    onSlid?: Function;
    touch?: boolean;
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
        onSlid: PropTypes.func,
        touch: PropTypes.bool
    };
    static defaultProps = {
        animation: "slide",
        controls: true,
        indicators: true,
        activeIndex: 0,
        interval: 5000,
        pauseOnHover: true,
        touch: true
    };

    state = {
        prevIndex: -1,
        currentIndex: -1
    };

    private el: React.RefObject<HTMLDivElement> = React.createRef();
    private timer: any = null;
    private dir: string = "";
    transitioning: boolean = false;
    startX: number = 0;

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
            this.dir = "";

            el.classList.remove(cls1, cls2);
            el.classList.add("active");
            onSlid();
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    to(index: number) {
        let childrenLen = this.getChildren().length;
        let {currentIndex} = this.state;

        if (typeof index !== "number") throw new Error("The param must be a number");

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
            if (!this.dir) this.dir = index > currentIndex ? "next" : "prev";
        }

        this.setState({
            currentIndex: index,
            prevIndex: currentIndex
        });
    }

    cycle() {
        this.timer = setTimeout(() => {
            this.toNext();
            this.cycle();
        }, this.props.interval);
    }

    start = () => {
        let children = this.getChildren();

        this.stop();
        children.length > 1 && this.cycle();
    };

    stop = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };

    toPrev() {
        let {currentIndex} = this.state;
        this.dir = "prev";
        this.to(--currentIndex);
    }

    _toPrev = (evt: React.MouseEvent) => {
        evt.preventDefault();
        this.toPrev();
    };

    toNext() {
        let {currentIndex} = this.state;
        this.dir = "next";
        this.to(++currentIndex);
    }

    _toNext = (evt: React.MouseEvent) => {
        evt.preventDefault();
        this.toNext();
    };

    handleClickIndicator = (evt: React.MouseEvent) => {
        let tgt = evt.target as HTMLElement;
        let index = parseInt(tgt.dataset.index as any);

        this.to(index);
    };
    handleTouchStart = (evt: React.TouchEvent) => {
        this.startX = evt.changedTouches[0].clientX;
        this.stop();
    };

    handleTouchEnd = (evt: React.TouchEvent) => {

        //after all touches end
        if (evt.touches.length) return;

        const THRESHOLD = 100;
        const distance = evt.changedTouches[0].clientX - this.startX;

        this.start();

        if (Math.abs(distance) < THRESHOLD) return;

        if (distance < 0) {
            this.toNext();
        } else {
            this.toPrev();
        }
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
                    href="#"
                    onClick={this._toPrev}>
                    <span className="carousel-control-prev-icon"/>
                </a>
                <a
                    className="carousel-control-next"
                    href="#"
                    onClick={this._toNext}>
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
            touch,
            pauseOnHover,
            ...otherProps
        } = this.props;

        const _children = React.Children.toArray(children);

        delete otherProps.activeIndex;
        delete otherProps.onSlide;
        delete otherProps.onSlid;

        if (pauseOnHover) {
            otherProps.onMouseOver = this.stop;
            otherProps.onMouseOut = this.start;
        }

        if (touch) {
            otherProps.onTouchStart = this.handleTouchStart;
            otherProps.onTouchEnd = this.handleTouchEnd;
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
                            if (!React.isValidElement(c)) return null;

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