import React from "react"
import { DivProps } from "./types"
import Fade from "./Fade"
import { classnames } from "./utils"
import NOTransition from "./no-transition"
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
    const classes = classnames(className, "r-backdrop")
    const transitionProps = {
        in: visible,
        unmountOnExit: true,
        timeout: 150
    }

    if (!transition) {
        return (
            <NOTransition {...transitionProps}>
                <div
                    className={classes}
                    style={{ zIndex }}
                    {...restProps} />
            </NOTransition>
        )
    }


    return (
        <Fade
            appear
            nodeRef={nodeRef}
        {...transitionProps}>
            <div
                ref={nodeRef}
                className={classes}
                style={{ ...style, zIndex }}
                {...restProps} />
        </Fade>
    )
}