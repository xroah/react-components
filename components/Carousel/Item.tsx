import * as React from "react"
import {omit} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {isValidNode} from "reap-utils/lib/react"
import CarouselContext from "./context"
import {CarouselItemProps, CarouselState, ContextObject} from "./types"

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
            activeIndex === __index__ && "active"
        )

        if (slide) {
            return null
        }

        return (
            <div
                className={classes}
                {...omit(restProps, "interval")}>
                {children}
                {caption}
            </div>
        )
    }

    return (
        <CarouselContext.Consumer>
            {render}
        </CarouselContext.Consumer>
    )
}

export default CarouselItem