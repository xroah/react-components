import * as React from "react"
import {isUndef} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {DivAttrs, ValueOf} from "../Commons/consts-and-types"
import {getPrefixFunc, map} from "../Commons/utils"
import CarouselItem, {PREFIX} from "./Item"
import Indicator from "./Indicator"

const variants = ["light", "dark"] as const

interface CarouselProps extends DivAttrs {
    keyboard?: boolean
    pause?: boolean | "hover"
    ride?: boolean | "carousel"
    wrap?: boolean
    touch?: boolean
    interval?: number
    controls?: boolean
    indicators?: boolean
    fade?: boolean
    variant?: ValueOf<typeof variants>
    onSlide?: () => void
    onSlid?: () => void
}

interface CarouselState {
    activeIndex: number
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
    constructor(props: CarouselProps) {
        super(props)

        this.state = {
            activeIndex: 0
        }
    }

    handleIndicatorClick = (i: number) => {
        this.to(i)
    }

    to(i: number) {
        const {activeIndex} = this.state

        if (activeIndex === i) {
            return
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
                <button className={ctrlPrefix("prev")} type="button">
                    <span className={ctrlPrefix("prev-icon")} />
                </button>
                <button className={ctrlPrefix("next")} type="button" >
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
                    {childrenEl}
                </div>
                {ctrlEl}
            </div>
        )
    }
}

export default Carousel