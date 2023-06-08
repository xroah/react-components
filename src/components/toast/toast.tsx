import React, { useEffect, useRef } from "react"
import { OneOf, ToggleEvents } from "../commons/types"
import ToastInner, { ToastInnerProps } from "./toast-inner"
import { Transition, TransitionStatus } from "react-transition-group"
import { classnames } from "../utils"
import Timer from "../utils/timer"
import ToastGlobalStyle from "./style"

const toastPlacements = [
    "top",
    "bottom",
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "tl",
    "tr",
    "bl",
    "br"
] as const

export const CLASS_PREFIX = "r-toast"

export type Placement = OneOf<typeof toastPlacements>

export interface ToastProps extends ToastInnerProps, ToggleEvents {
    visible?: boolean
    placement?: Placement
    duration?: number
}

export const TOP = "top"
export const BOTTOM = "bottom"
export const TOP_LEFT: Placement = "top-left"
export const TOP_RIGHT: Placement = "top-right"
export const BOTTOM_LEFT: Placement = "bottom-left"
export const BOTTOM_RIGHT: Placement = "bottom-right"

const placementSet = new Set(toastPlacements)
export const placementMap = new Map<Placement, Placement>([
    [TOP, TOP],
    [BOTTOM, BOTTOM],
    [TOP_LEFT, TOP_LEFT],
    ["tl", TOP_LEFT],
    [TOP_RIGHT, TOP_RIGHT],
    ["tr", TOP_RIGHT],
    [BOTTOM_LEFT, BOTTOM_LEFT],
    ["bl", BOTTOM_LEFT],
    [BOTTOM_RIGHT, BOTTOM_RIGHT],
    ["br", BOTTOM_RIGHT]
])

export function checkPlacement(placement: Placement) {
    if (!placementSet.has(placement)) {
        console.error(
            `The placement prop should be one of '${toastPlacements.join(",")}'`
        )

        return false
    }

    return true
}

function getInitialTransform(placement: Placement) {
    const DIS = "100%"
    let transform = ""

    switch (placement) {
        case "top":
            transform = `translateY(-${DIS})`
            break
        case "bottom":
            transform = `translateY(${DIS})`
            break
        case "top-left":
        case "bottom-left":
            transform = `translateX(-${DIS})`
            break
        default:
            transform = `translateX(${DIS})`
    }

    return transform
}

const Toast: React.FC<ToastProps> = ({
    placement = "bottom-right",
    visible,
    className,
    style,
    children,
    icon,
    closable,
    title,
    header,
    secondaryTitle,
    duration = 3000,
    variant,
    simple,
    onClose,
    onShow,
    onShown,
    onHide,
    onHidden,
    onMouseEnter,
    onMouseLeave,
    ...restProps
}) => {
    if (!checkPlacement(placement)) {
        return null
    }

    const timer = useRef(new Timer(duration))
    const classes = classnames(
        className,
        "r-toast-item"
    )
    const nodeRef = React.useRef<HTMLDivElement>(null)
    const initialStyle: React.CSSProperties = {
        transform: getInitialTransform(placement),
        opacity: 0
    }
    const toastInnerProps: ToastInnerProps = {
        icon,
        title,
        closable,
        header,
        secondaryTitle,
        children,
        variant,
        simple,
        onClose
    }
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        timer.current.clear()
        onMouseEnter?.(e)
    }
    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (duration > 0) {
            timer.current.delay(true)
        }

        onMouseLeave?.(e)
    }
    const render = (s: TransitionStatus) => {
        const newStyle: React.CSSProperties = {}

        if (s === "entering" || s === "entered") {
            newStyle.opacity = 1
            newStyle.transform = "none"

            if (s === "entered") {
                newStyle.height = nodeRef.current?.scrollHeight
            }
        } else if (s === "exiting") {
            newStyle.height = 0
            newStyle.transform = "none"
        }

        return (
            <div
                className={classes}
                ref={nodeRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    ...style,
                    ...initialStyle,
                    ...newStyle
                }}
                {...restProps}>
                <ToastInner {...toastInnerProps} />
            </div>
        )
    }

    if (onClose) {
        timer.current.callback = onClose
    }

    useEffect(
        () => {
            const { current: t } = timer
            t.timeout = duration

            if (duration > 0) {
                t.delay(true)
            } else {
                t.clear()
            }

            return () => timer.current.clear()
        },
        [duration]
    )

    return (
        <>
            <ToastGlobalStyle />
            <Transition
                in={visible}
                timeout={300}
                nodeRef={nodeRef}
                onEnter={onShow}
                onEntered={onShown}
                onExit={onHide}
                onExited={onHidden}
                appear
                unmountOnExit>
                {render}
            </Transition>
        </>
    )
}

export default Toast