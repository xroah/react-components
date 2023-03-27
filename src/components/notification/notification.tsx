import React, { useEffect, useRef } from "react"
import { OneOf, ToggleEvents } from "../commons/types"
import Toast, { ToastProps } from "../basics/toast"
import { notificationPlacements } from "../commons/constants"
import { Transition, TransitionStatus } from "react-transition-group"
import { classnames } from "../utils"
import Timer from "r-layers/utils/timer"

export type Placement = OneOf<typeof notificationPlacements>

export interface NotificationProps extends ToastProps, ToggleEvents {
    visible?: boolean
    placement?: Placement
    duration?: number
}

export const TOP_LEFT: Placement = "top-left"
export const TOP_RIGHT: Placement = "top-right"
export const BOTTOM_LEFT: Placement = "bottom-left"
export const BOTTOM_RIGHT: Placement = "bottom-right"

const placementSet = new Set(notificationPlacements)
export const placementMap = new Map<Placement, Placement>([
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
            `The placement prop should be one of '${notificationPlacements.join(",")}'`
        )

        return false
    }

    return true
}

const Notification: React.FC<NotificationProps> = ({
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
        "r-notification-item"
    )
    const nodeRef = React.useRef<HTMLDivElement>(null)
    const isLeft = placementMap.get(placement)?.includes("left")
    const initialStyle: React.CSSProperties = {
        transform: `translateX(${isLeft ? -100 : 100}%)`,
        opacity: 0
    }
    const toastProps: ToastProps = {
        icon,
        title,
        closable,
        header,
        secondaryTitle,
        children,
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
                <Toast {...toastProps}/>
            </div>
        )
    }

    if (onClose) {
        timer.current.callback = onClose
    }

    useEffect(
        () => {
            const {current: t} = timer
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
    )
}

export default Notification