import * as React from "react"
import {isUndef} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc, map} from "../Commons/utils"
import CarouselItem, {PREFIX} from "./Item"
import Indicator from "./Indicator"
import CarouselContext from "./context"
import {CarouselProps, CarouselState, Direction} from "./types"

class Carousel extends React.Component<CarouselProps, CarouselState> {
    constructor(props: CarouselProps) {
        super(props)

        this.state = {
            activeIndex: 0
        }
    }

    handleIndicatorClick = (i: number) => {
        const {activeIndex} = this.state

        this.to(i, activeIndex > i ? "next" : "prev")
    }

    getTotal() {
        const {children} = this.props

        return React.Children.count(children)
    }

    prev = () => {
        let {activeIndex} = this.state

        if (activeIndex === 0) {
            activeIndex = this.getTotal() - 1
        } else {
            activeIndex--
        }

        this.to(activeIndex, "prev")
    }

    next = () => {
        let {activeIndex} = this.state
        const total = this.getTotal()

        if (activeIndex === total - 1) {
            activeIndex = 0
        } else {
            activeIndex++
        }

        this.to(activeIndex, "next")
    }

    to(i: number, dir: Direction = "next") {
        const {activeIndex} = this.state

        if (
            activeIndex === i ||
            i < 0 ||
            i >= this.getTotal()
        ) {
            return
        }

        this.setState({
            nextIndex: i,
            dir
        })
    }

    render() {
        const {
            className,
            fade,
            controls,
            indicators,
            children,
            variant,
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
                        __index__: i
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
                    <CarouselContext.Provider value={{...this.state}}>
                        {childrenEl}
                    </CarouselContext.Provider>
                </div>
                {ctrlEl}
            </div>
        )
    }
}

export default Carousel