import React from "react"
import { OneOf, ToggleEvents } from "../commons/types"
import Toast, { ToastProps } from "../basics/toast"
import { notificationPlacements } from "../commons/constants"
import { Transition, TransitionStatus } from "react-transition-group"
import {classnames } from "../utils"

type Placement = OneOf<typeof notificationPlacements>

interface NotificationProps extends ToastProps, ToggleEvents {
    visible?: boolean
    placement?: Placement
}

const placementSet = new Set(notificationPlacements)
export const placementMap = new Map<Placement, Placement>([
    ["top-left", "top-left"],
    ["tl", "top-left"],
    ["top-right", "top-right"],
    ["tr", "top-right"],
    ["bottom-left", "bottom-left"],
    ["bl", "bottom-left"],
    ["bottom-right", "bottom-right"],
    ["bl", "bottom-right"],
])

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
    onClose,
    onShow,
    onShown,
    onHide,
    onHidden,
    ...restProps
}) => {
    if (!placementSet.has(placement)) {
        console.error(
            `The placement prop should be one of '${notificationPlacements.join(",")}'`
        )

        return null
    }

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
        onClose
    }

    const render = (s: TransitionStatus) => {
        const newStyle: React.CSSProperties = {}

        if (s === "entering" || s === "entered") {
            newStyle.opacity = 1
            newStyle.transform = "none"

            if (s === "entered") {
                newStyle.height = nodeRef.current?.scrollHeight
            }
        } else {
            newStyle.height = 0

            if (s === "exiting") {
                newStyle.transform = "none"
            }
        }
        
        return (
            <div
                className={classes}
                ref={nodeRef}
                style={{
                    ...style,
                    ...initialStyle,
                    ...newStyle
                }}
                {...restProps}>
                <Toast {...toastProps}>
                    {children}
                </Toast>
            </div>
        )
    }

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