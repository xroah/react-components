import React, { FC, ReactNode, cloneElement, useContext, useEffect, useRef } from "react"
import { DivProps } from "../commons/types"
import { classnames, omit } from "../utils"
import { Transition, TransitionStatus } from "react-transition-group"
import carouselContext from "./context"

interface CarouselItemProps extends DivProps {
    interval?: number
    caption?: ReactNode
    // internal
    __active?: number
}

export const PREFIX = "carousel"

const Item: FC<CarouselItemProps> = (
    {
        className,
        children,
        caption,
        __active,
        ...restProps
    }: CarouselItemProps
) => {
    const itemClass = `${PREFIX}-item`
    const ctx = useContext(carouselContext)
    const nodeRef = useRef<HTMLDivElement>(null)
    const handleEnter = () => {
        ctx.onSlide()
        // reflow
        nodeRef.current?.offsetHeight
    }
    const handleEntered = () => {
        ctx.onSlid()
    }
    const el = (
        <div ref={nodeRef} {...restProps}>
            {children}
            <div className={`${PREFIX}-caption`}>
                {caption}
            </div>
        </div>
    )
    const render = (status: TransitionStatus) => {
        const isNext = ctx.dir === "next"
        const directionalClassName = isNext ?
            `${itemClass}-start` : `${itemClass}-end`
        const orderClassName = isNext ?
            `${itemClass}-next` : `${itemClass}-prev`
        return cloneElement(
            el,
            {
                className: classnames(
                    className,
                    itemClass,
                    __active && status !== "entered" && orderClassName,
                    (status === "entered" || status === "exiting") &&
                    "active",
                    (status === "entering" || status === "exiting") &&
                    directionalClassName
                )
            }
        )
    }

    useEffect(
        () => {
            if (__active && !ctx.slide) {
                ctx.onSlide()
                ctx.onSlid()
            }
        },
        [__active, ctx.slide, ctx.onSlid, ctx.onSlide]
    )

    omit(restProps, "interval")

    return (
        ctx.slide ? (
            <Transition
                in={!!__active}
                nodeRef={nodeRef}
                timeout={600}
                onEnter={handleEnter}
                onEntered={handleEntered}>
                {render}
            </Transition>
        ) : cloneElement(
            el,
            {
                className: classnames(
                    className,
                    itemClass,
                    __active && "active",
                )
            }
        )
    )
}

export default Item