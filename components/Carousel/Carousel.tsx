import * as React from "react";
import PropTypes from "prop-types";
import {
    emulateTransitionEnd,
    handleFuncProp,
    reflow,
    classNames
} from "../utils";
import { CommonProps } from "../CommonPropsInterface";

export interface CarouselProps extends CommonProps<HTMLDivElement> {
    animation?: "slide" | "fade";
    controls?: boolean;
    indicators?: boolean;
    defaultActiveIndex?: number;
    activeIndex?: number;
    interval?: number;
    pauseOnHover?: boolean;
    onSlide?: Function;
    onSlid?: Function;
    touch?: boolean;
}

interface CarouselState {
    prevIndex: number;
    curIndex: number;
}

export default class Carousel extends React.Component<CarouselProps, CarouselState> {

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
        interval: 5000,
        pauseOnHover: true,
        touch: true
    };

    private el: React.RefObject<HTMLDivElement> = React.createRef();
    private timer: any = null;
    private dir: string = "";
    transitioning: boolean = false;
    startX: number = 0;

    constructor(props: CarouselProps) {
        super(props);

        const {
            defaultActiveIndex,
            activeIndex
        } = props;

        this.state = {
            prevIndex: -1,
            curIndex: activeIndex || defaultActiveIndex || 0
        };
    }

    static getDerivedStateFromProps(nextProps: CarouselProps, nextState: CarouselState) {
        if ("activeIndex" in nextProps) {
            nextState.prevIndex = nextState.curIndex;
            nextState.curIndex = nextProps.activeIndex as number;
        }

        return nextState;
    }

    componentDidMount() {
        this.update(false);
        this.start();
    }

    componentDidUpdate() {
        this.update();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    update(isUpdate = true) {
        const PREFIX = "carousel-item";
        const children = this.getChildren();
        let {
            state: {
                curIndex,
                prevIndex
            },
            props: {
                onSlide,
                onSlid
            }
        } = this;
        let el = children[curIndex] as HTMLElement;
        let prevEl = children[prevIndex] as HTMLElement;
        let clsMap: any = {
            prev: "right",
            next: "left"
        };
        let cls1 = `${PREFIX}-${this.dir}`;
        let cls2 = `${PREFIX}-${clsMap[this.dir]}`;

        if (!el) return;

        //component just mounted
        if (!isUpdate) {
            prevEl && prevEl.classList.remove("active");
            return el.classList.add("active");
        }

        this.transitioning = true;

        el.classList.add(cls1);
        reflow(el);
        el.classList.add(cls2);
        handleFuncProp(onSlide)();
        emulateTransitionEnd(el, () => {
            this.transitioning = false;

            el.classList.remove(cls1, cls2);
            el.classList.add("active");
            handleFuncProp(onSlid)();
        });

        //setTimeout for firefox(may have a narrow space between items when sliding)
        setTimeout(() => {
            if (prevEl) {
                prevEl.classList.add(cls2, "active");
                emulateTransitionEnd(prevEl, () => {
                    prevEl.classList.remove(cls2, "active");
                });
            }
        }, 20);
    }

    to(index: number) {
        let childrenLen = this.getChildren().length;
        let { curIndex } = this.state;

        if (typeof index !== "number") throw new Error("The param must be a number");

        if (this.transitioning || childrenLen <= 1) return;

        //cycle
        if (index >= childrenLen) {
            index = 0;
        } else if (index < 0) {
            index = childrenLen - 1;
        }

        if (index === curIndex) return;

        //component just mount
        if (curIndex === -1) {
            this.dir = "";
        } else {
            if (!this.dir) this.dir = index > curIndex ? "next" : "prev";
        }

        this.setState({
            curIndex: index,
            prevIndex: curIndex
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

    toPrev = (evt?: React.MouseEvent) => {
        let { curIndex } = this.state;
        this.dir = "prev";

        this.to(--curIndex);
        evt && evt.preventDefault();
    };

    toNext = (evt?: React.MouseEvent) => {
        let { curIndex } = this.state;
        this.dir = "next";

        this.to(++curIndex);
        evt && evt.preventDefault();
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
                    onClick={this.toPrev}>
                    <span className="carousel-control-prev-icon" />
                </a>
                <a
                    className="carousel-control-next"
                    href="#"
                    onClick={this.toNext}>
                    <span className="carousel-control-next-icon" />
                </a>
            </>
        );
    }

    renderIndicators(children: React.ReactNode) {
        const {
            curIndex
        } = this.state;
        return (
            <ol className="carousel-indicators">
                {
                    React.Children.map(
                        children,
                        (c, i) => <li
                            key={i}
                            data-index={i}
                            onClick={this.handleClickIndicator}
                            className={classNames(curIndex === i && "active")} />
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

        delete otherProps.activeIndex;
        delete otherProps.onSlide;
        delete otherProps.onSlid;
        delete otherProps.defaultActiveIndex;
        delete otherProps.interval;

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
                {indicators && this.renderIndicators(children)}
                <div className="carousel-inner" ref={this.el}>
                    {
                        React.Children.map(children, (c, i) => {
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