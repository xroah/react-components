import React from "react"
import { DivProps } from "./types"
import Fade from "./Fade"
import { classnames } from "./utils"
interface BackdropProps extends DivProps {
    visible: boolean
    zIndex?: number
    transition?: boolean
}

export default function Backdrop(
    {
        visible,
        zIndex,
        transition = true,
        style,
        className,
        ...restProps
    }: BackdropProps
) {
    const nodeRef = React.useRef<HTMLDivElement>(null)
    const classes = [className, "r-backdrop"]

    if (!transition) {
        if (!visible) {
            return null
        }

        classes.push("show")

        return (
            <div
                className={classnames(...classes)}
                style={{ zIndex }}
                {...restProps} />
        )
    }

    return (
        <Fade
            appear
            nodeRef={nodeRef}
            in={visible}
            unmountOnExit
            timeout={150}>
            <div
                ref={nodeRef}
                className={classnames(...classes)}
                style={{ ...style, zIndex }}
                {...restProps} />
        </Fade>
    )
}