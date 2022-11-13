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
        ...restProps
    }: BackdropProps
) {
    const nodeRef = React.useRef<HTMLDivElement>(null)
    const CLASS = "r-backdrop"

    if (!transition) {
        const classes = classNames(
            CLASS,
            visible && "show"
        )

        if (!visible) {
            return null
        }

        return <div className={classes} style={{ zIndex }} />
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
                    let classes = `${CLASS} fade`

                    if (state === "entering" || state === "entered") {
                        classes += " show"
                    }

                    return (
                        <div
                            ref={nodeRef}
                            className={classes}
                            style={{ ...style, zIndex }} />
                    )
                }
            }
        </Transition>
    )
}