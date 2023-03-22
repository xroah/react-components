import React from "react"
import { DivProps } from "../commons/types"
import Fade from "./fade"
import NOTransition from "./no-transition"
interface BackdropProps extends DivProps {
    visible: boolean
    transition?: boolean
}

export default function Backdrop(
    {
        visible,
        transition = true,
        ...restProps
    }: BackdropProps
) {
    const nodeRef = React.useRef<HTMLDivElement>(null)
    const transitionProps = {
        in: visible,
        unmountOnExit: true,
        timeout: 150
    }

    if (!transition) {
        return (
            <NOTransition {...transitionProps}>
                <div {...restProps} />
            </NOTransition>
        )
    }


    return (
        <Fade
            appear
            nodeRef={nodeRef}
            {...transitionProps}>
            <div ref={nodeRef} {...restProps} />
        </Fade>
    )
}