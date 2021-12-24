import * as React from "react"
import {isUndef} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc, map} from "../Commons/utils"
import CarouselItem, {PREFIX} from "./Item"
import Indicator from "./Indicator"
import CarouselContext from "./context"
import {
    CarouselProps,
    CarouselState,
    Direction
} from "./types"

class Carousel extends React.Component<CarouselProps, CarouselState> {
    sliding = false
    queue: Function[] = []

    constructor(props: CarouselProps) {
        super(props)

        this.state = {
            activeIndex: 0
        }
    }

    handleIndicatorClick = (i: number) => {
        this.to(i)
    }

    getTotal() {
        const {children} = this.props

        return React.Children.count(children)
    }

    prev = () => {
        if (this.queue.length) {
            return
        }

        let {activeIndex} = this.state

        if (activeIndex === 0) {
            activeIndex = this.getTotal() - 1
        } else {
            activeIndex--
        }

        this.slide(activeIndex, "prev")
    }

    next = () => {
        if (this.queue.length) {
            return
        }

        let {activeIndex} = this.state
        const total = this.getTotal()

        if (activeIndex === total - 1) {
            activeIndex = 0
        } else {
            activeIndex++
        }

        this.slide(activeIndex, "next")
    }

    slide(i: number, dir: Direction) {
        if (
            i === this.state.activeIndex ||
            this.sliding
        ) {
            return
        }

        this.setState({
            activeIndex: i,
            dir
        })
    }

    // for indicators
    to(i: number) {
        const {activeIndex} = this.state

        if (
            i < 0 ||
            i >= this.getTotal()
        ) {
            return
        }

        if (this.sliding) {
            this.queue.push(
                () => this.to(i)
            )

            return
        }

        this.slide(i, activeIndex < i ? "next" : "prev")
    }

    handleEnter = () => {
        this.sliding = true

        this.props.onSlide?.(this.state.activeIndex)
    }

    handleEntered = () => {
        const fn = this.queue.shift()
        this.sliding = false

        this.props.onSlid?.(this.state.activeIndex)

        if (fn) {
            setTimeout(fn, 20)
        }
    }

    render() {
        const {
            className,
            fade,
            controls,
            indicators,
            children,
            variant,
            slide,
        } = this.props
        const prefix = getPrefixFunc(PREFIX)
        const ctrlPrefix = getPrefixFunc(prefix("control"))
        const classes = classNames(
            className,
            prefix(),
            fade && prefix("fade"),
            variant === "dark" && prefix("dark")
        )
        const ctrlEl = controls ? (
            <>
                <button
                    className={ctrlPrefix("prev")}
                    type="button"
                    onClick={this.prev}>
                    <span className={ctrlPrefix("prev-icon")} />
                </button>
                <button
                    className={ctrlPrefix("next")}
                    type="button"
                    onClick={this.next} >
                    <span className={ctrlPrefix("next-icon")} />
                </button>
            </>
        ) : null
        let indicatorWrapper: React.ReactElement | null = null
        let indicatorEls: React.ReactElement[] = []
        let childrenEl = map(
            children,
            (c, i) => {
                if (c.type !== CarouselItem) {
                    throw new TypeError(
                        "The children of Carousel should be Carousel.Item"
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

        if (indicators) {
            indicatorWrapper = (
                <div className={prefix("indicators")}>
                    {indicatorEls}
                </div>
            )
        }

        return (
            <div className={classes}>
                {indicatorWrapper}
                <div className={prefix("inner")}>
                    <CarouselContext.Provider value={{...this.state, slide}}>
                        {childrenEl}
                    </CarouselContext.Provider>
                </div>
                {ctrlEl}
            </div>
        )
    }
}

export default Carousel