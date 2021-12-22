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
    handleIndicatorClick = (i: number) => {
        console.log(i)
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
        let indicatorEl: React.ReactElement | undefined

        if (indicators) {
            let index = 0
            const indicatorEls = map(
                children,
                (c, i) => {
                    if (c.type === CarouselItem) {
                        const k = String(isUndef(c.key) ? i : c.key)

                        return (
                            <Indicator
                                key={k}
                                index={index++}
                                onClick={this.handleIndicatorClick} />
                        )
                    }

                    return null
                }
            )
            indicatorEl = (
                <div className={prefix("indicators")}>
                    {indicatorEls}
                </div>
            )
        }

        return (
            <div className={classes}>
                {indicatorEl}
                <div className={prefix("inner")}>
                    {children}
                </div>
                {ctrlEl}
            </div>
        )
    }
}

export default Carousel