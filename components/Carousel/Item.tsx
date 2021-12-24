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
import {
    END_CLASS,
    ITEM_PREFIX,
    NEXT_CLASS,
    PREFIX,
    PREV_CLASS,
    START_CLASS
} from "./constants"
import CarouselContext from "./context"
import {itemPropsTypes} from "./props"
import {
    CarouselItemProps,
    ContextObject,
    Direction
} from "./types"

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

export function getCaption(
    caption?: React.ReactNode,
    captionClass?: string
) {
    if (!isValidNode(caption)) {
        return null
    }

    return (
        <div className={
            classNames(
                captionClass,
                `${PREFIX}-caption`
            )
        }>
            {caption}
        </div>
    )
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
        const el = (
            <div
                className={classes}
                ref={ref}
                {...omit(restProps, "interval")}>
                {children}
                {getCaption(caption, captionClass)}
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

CarouselItem.propTypes = itemPropsTypes

export default CarouselItem