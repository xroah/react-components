import React from "react"
import { Transition } from "react-transition-group"
import classNames from "classnames"

interface BackdropProps {
    visible: boolean
    zIndex?: number
}

export default function Backdrop(
    {
        visible,
        zIndex
    }: BackdropProps
) {
    const nodeRef = React.useRef<HTMLDivElement>(null)

    return (
        <Transition
            appear
            nodeRef={nodeRef}
            in={visible}
            unmountOnExit
            timeout={150}>
            {
                state => {
                    let classes = "bs-backdrop fade"

                    if (state === "entering" || state === "entered") {
                        classes += " show"
                    }

                    return <div
                        ref={nodeRef}
                        className={classes}
                        style={{ zIndex }} />
                }
            }
        </Transition>
    )
}