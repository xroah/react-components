import React from "react"
import { Transition } from "react-transition-group"
import classNames from "classnames"
import { DivProps } from "./types"

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
    const classes = [
        className,
        "r-backdrop"
    ]

    if (!transition) {
        if (!visible) {
            return null
        }

        classes.push("show")

        return (
            <div
                className={classes.join(" ").trim()}
                style={{ zIndex }}
                {...restProps} />
        )
    }

    return (
        <Transition
            appear
            nodeRef={nodeRef}
            in={visible}
            unmountOnExit
            timeout={150}>
            {
                state => {
                    let classes = `r-backdrop fade`

                    if (state === "entering" || state === "entered") {
                        classes += " show"
                    }

                    return (
                        <div
                            ref={nodeRef}
                            className={classes}
                            style={{ ...style, zIndex }}
                            {...restProps} />
                    )
                }
            }
        </Transition>
    )
}