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
    const child = <div className={className} {...restProps} />
    const fadeProps = {
        in: !!visible,
        onEntered,
        onExited
    }

    return fade ?
        <Fade {...fadeProps}>{child}</Fade> :
        <NoTransition {...fadeProps}>{child}</NoTransition>
}