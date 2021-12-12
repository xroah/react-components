import * as React from "react"
import {Fade, NoTransition} from "reap-utils/lib/react"
import {Cb} from "./common-types"

interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
    visible?: boolean
    fade?: boolean
    onExited?: Cb
    onEntered?: Cb
}

export default function Backdrop(
    {
        className,
        visible,
        onExited,
        onEntered,
        fade = true,
        ...restProps
    }: BackdropProps
) {
    const ref = React.useRef<HTMLDivElement>(null)
    const child = (
        <div
            ref={ref}
            className={className}
            {...restProps} />
    )
    const fadeProps = {
        in: !!visible,
        nodeRef: ref,
        onEntered,
        onExited
    }

    return fade ?
        <Fade {...fadeProps}>{child}</Fade> :
        <NoTransition {...fadeProps}>{child}</NoTransition>
}