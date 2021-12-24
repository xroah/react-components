import * as React from "react"
import {isUndef, omit} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc, map} from "../Commons/utils"
import CarouselItem from "./Item"
import Indicator from "./Indicator"
import CarouselContext from "./context"
import {
    CarouselProps,
    CarouselState,
    Direction
} from "./types"
import ControlBtn from "./ControlBtn"
import {PREFIX} from "./constants"

class Carousel extends React.Component<CarouselProps, CarouselState> {
    sliding = false
    queue: Function[] = []
    timer: number | null = null

    static defaultProps: CarouselProps = {
        slide: true,
        keyboard: true,
        wrap: true,
        interval: 5000,
        pause: "hover"
    }

    constructor(props: CarouselProps) {
        super(props)

        this.state = {
            activeIndex: 0
        }
    }

    componentDidMount() {
        if (!this.props.ride) {
            this.cycle()
        }
    }

    handleIndicatorClick = (i: number) => {
        this.to(i)
    }

    getTotal() {
        const {children} = this.props

        return React.Children.count(children)
    }

    getNext() {
        let {activeIndex} = this.state
        const total = this.getTotal()

        if (activeIndex === total - 1) {
            if (this.props.wrap) {
                activeIndex = 0
            }
        } else {
            activeIndex++
        }

        return activeIndex
    }

    prev = () => {
        if (this.queue.length) {
            return
        }

        let {activeIndex} = this.state

        if (activeIndex === 0) {
            if (this.props.wrap) {
                activeIndex = this.getTotal() - 1
            }
        } else {
            activeIndex--
        }

        this.slide(activeIndex, "prev")
    }

    next = () => {
        if (this.queue.length) {
            return
        }

        this.slide(this.getNext(), "next")
    }

    nextWhenVisible = () => {
        if (document.hidden) {
            this.cycle()
        } else {
            this.next()
        }
    }

    pause = () => {
        if (this.timer !== null) {
            window.clearTimeout(this.timer)

            this.timer = null
        }
    }

    cycle = () => {
        const {children, interval} = this.props

        if (!Array.isArray(children) || !interval) {
            return
        }

        const nextChild = children[this.getNext()]

        this.pause()

        if (nextChild) {
            this.timer = window.setTimeout(
                this.nextWhenVisible,
                nextChild.props.interval || interval
            )
        }
    }

    handleKeydown = (evt: React.KeyboardEvent) => {
        const key = evt.key.toLowerCase()

        switch (key) {
            case "arrowleft":
                this.prev()
                break
            case "arrowright":
                this.next()
                break
            default:
            // do nothing
        }
    }

    slide(i: number, dir: Direction) {
        if (i === this.state.activeIndex) {
            this.cycle()

            return
        }

        if (!this.sliding) {
            this.pause()
            this.setState({
                activeIndex: i,
                dir
            })
        }
    }

    // for indicators
    to(i: number) {
        const {activeIndex} = this.state

        if (i < 0 || i >= this.getTotal()) {
            return
        }

        if (this.sliding) {
            return this.queue.push(() => this.to(i))
        }

        this.slide(i, activeIndex < i ? "next" : "prev")
    }

    handleEnter = () => {
        this.sliding = true

        this.props.onSlide?.(this.state.activeIndex)
    }

    handleEntered = () => {
        this.sliding = false

        this.props.onSlid?.(this.state.activeIndex)

        if (this.queue.length) {
            const fn = this.queue.shift()

            setTimeout(fn!, 20)
        } else {
            this.cycle()
        }
    }

    renderChildren(
        children: React.ReactNode,
        indicators?: boolean
    ) {
        const indicatorEls: React.ReactElement[] = []
        let indicatorWrapper: React.ReactElement | undefined
        let childrenEl = map(
            children,
            (c, i) => {
                if (c.type !== CarouselItem) {
                    throw new TypeError(
                        "The children of the Carousel must be Carousel.Item"
                    )
                }

                const k = String(isUndef(c.key) ? i : c.key)

                if (indicators) {
                    indicatorEls.push(
                        <Indicator
                            key={k}
                            index={i}
                            active={this.state.activeIndex === i}
                            onClick={this.handleIndicatorClick} />
                    )
                }

                return React.cloneElement(
                    c,
                    {
                        __index__: i,
                        __onEnter__: this.handleEnter,
                        __onEntered__: this.handleEntered
                    }
                )
            }
        )

        if (indicatorEls.length) {
            indicatorWrapper = (
                <div className={`${PREFIX}-indicators`}>
                    {indicatorEls}
                </div>
            )
        }

        return [childrenEl, indicatorWrapper]
    }

    render() {
        const {
            tabIndex,
            className,
            fade,
            controls,
            indicators,
            children: c,
            variant,
            keyboard,
            slide,
            pause,
            ...restProps
        } = this.props
        const prefix = getPrefixFunc(PREFIX)
        const ctrlPrefix = getPrefixFunc(prefix("control"))
        const classes = classNames(
            className,
            prefix(),
            fade && prefix("fade"),
            variant === "dark" && prefix("dark")
        )
        const children = this.renderChildren(c, indicators)
        const props = omit(
            restProps,
            [
                "interval",
                "wrap",
                "touch",
                "ride",
                "onSlide",
                "onSlid"
            ]
        )

        if (pause === "hover") {
            props.onMouseEnter = this.pause
            props.onMouseLeave = this.cycle
        }

        if (keyboard) {
            props.onKeyDown = this.handleKeydown
        }

        return (
            <div
                tabIndex={keyboard && isUndef(tabIndex) ? -1 : tabIndex}
                className={classes}
                {...props}>
                {children[1]}
                <div className={prefix("inner")}>
                    <CarouselContext.Provider
                        value={{...this.state, slide}}>
                        {children[0]}
                    </CarouselContext.Provider>
                </div>
                {
                    controls ? (
                        <>
                            <ControlBtn
                                onClick={this.prev}
                                prefix={ctrlPrefix("prev")} />
                            <ControlBtn
                                onClick={this.next}
                                prefix={ctrlPrefix("next")} />
                        </>
                    ) : null
                }
            </div>
        )
    }
}

export default Carousel