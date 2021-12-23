import * as React from "react"
import {omit} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {
    isValidNode,
    NoTransition,
    Transition
} from "reap-utils/lib/react"
import {StateType} from "reap-utils/lib/react/transition/interface"
import {ACTIVE_CLASS} from "../Commons/consts-and-types"
import CarouselContext from "./context"
import {
    CarouselItemProps,
    ContextObject,
    Direction
} from "./types"

export const PREFIX = "carousel"
export const ITEM_PREFIX = `${PREFIX}-item`

const START_CLASS = `${ITEM_PREFIX}-start`
const END_CLASS = `${ITEM_PREFIX}-end`
const NEXT_CLASS = `${ITEM_PREFIX}-next`
const PREV_CLASS = `${ITEM_PREFIX}-prev`

const getTransitionRenderer = (
    el: React.ReactElement,
    classes: string,
    dir?: Direction,
) => {
    return (status: StateType) => {
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
}

const CarouselItem: React.FunctionComponent<CarouselItemProps> = (
    {
        className,
        caption,
        captionClass,
        children,
        __index__,
        __onEnter__,
        __onEntered__,
        ...restProps
    }
) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const render = (
        {
            activeIndex,
            slide,
            dir
        }: ContextObject
    ) => {
        const classes = classNames(
            className,
            ITEM_PREFIX,
            !slide && activeIndex === __index__ && ACTIVE_CLASS
        )
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
        const el = (
            <div
                className={classes}
                ref={ref}
                {...omit(restProps, "interval")}>
                {children}
                {captionEl}
            </div>
        )
        const transitionProps = {
            in: __index__ === activeIndex,
            nodeRef: ref,
            children: getTransitionRenderer(el, classes, dir),
            onEnter: __onEnter__,
            onEntered: __onEntered__
        }

        return slide ?
            <Transition {...transitionProps} /> :
            <NoTransition {...transitionProps} />
    }

    return (
        <CarouselContext.Consumer>
            {render}
        </CarouselContext.Consumer>
    )
}

export default CarouselItem