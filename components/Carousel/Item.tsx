import * as React from "react"
import {omit} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {isValidNode, Transition} from "reap-utils/lib/react"
import {StateType} from "reap-utils/lib/react/transition/interface"
import CarouselContext from "./context"
import {CarouselItemProps, ContextObject} from "./types"

export const PREFIX = "carousel"
export const ITEM_PREFIX = `${PREFIX}-item`

const START_CLASS = `${ITEM_PREFIX}-start`
const END_CLASS = `${ITEM_PREFIX}-end`
const NEXT_CLASS = `${ITEM_PREFIX}-next`
const PREV_CLASS = `${ITEM_PREFIX}-prev`

const CarouselItem: React.FunctionComponent<CarouselItemProps> = (
    {
        className,
        caption,
        captionClass,
        children,
        __index__,
        ...restProps
    }
) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const ACTIVE_CLASS = "active"
    const captionEl = isValidNode(caption) ? (
        <div className={
            classNames(
                captionClass,
                `${PREFIX}-caption`
            )
        }>
            {caption}
        </div>
    ) : null
    const render = (
        {
            activeIndex,
            slide,
            dir
        }: ContextObject
    ) => {
        let classes = classNames(
            className,
            ITEM_PREFIX,
            !slide && activeIndex === __index__ && ACTIVE_CLASS
        )
        let el = (
            <div
                className={classes}
                ref={ref}
                {...omit(restProps, "interval")}>
                {children}
                {captionEl}
            </div>
        )

        if (slide) {
            const renderTransition = (
                status: StateType
            ) => {
                let dirClass = ""
                let orderClass = ""
                let newClasses = ""

                if (dir === "prev") {
                    dirClass = PREV_CLASS
                    orderClass = END_CLASS
                } else if (dir === "next") {
                    dirClass = NEXT_CLASS
                    orderClass = START_CLASS
                }

                switch (status) {
                    case "enter":
                        newClasses = dirClass
                        break
                    case "entering":
                        newClasses = `${orderClass} ${dirClass}`
                        break
                    // @ts-ignore: fall through
                    case "entered":
                    case "exit":
                        newClasses = ACTIVE_CLASS
                        break
                    case "exiting":
                        newClasses = `${ACTIVE_CLASS} ${orderClass}`
                }

                return React.cloneElement(
                    el,
                    {
                        className: `${classes} ${newClasses}`
                    }
                )
            }

            return (
                <Transition
                    nodeRef={ref}
                    in={__index__ === activeIndex}>
                    {renderTransition}
                </Transition>
            )
        }

        return el
    }

    return (
        <CarouselContext.Consumer>
            {render}
        </CarouselContext.Consumer>
    )
}

export default CarouselItem