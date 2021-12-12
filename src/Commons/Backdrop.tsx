import * as React from "react"
import {classNames} from "reap-utils/lib"
import {Fade, NoTransition} from "reap-utils/lib/react"
import {
    Cb,
    CommonTransitionProps,
    DivProps,
    VisibleProps
} from "./common-types"

type BaseProps = DivProps & CommonTransitionProps & VisibleProps

export interface BackdropProps extends BaseProps {
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
        unmountOnExit,
        ...restProps
    }: BackdropProps
) {
    const ref = React.useRef<HTMLDivElement>(null)
    const classes = classNames(
        className,
        !fade && "show"
    )
    const child = (
        <div
            ref={ref}
            className={classes}
            {...restProps} />
    )
    const fadeProps = {
        in: !!visible,
        nodeRef: ref,
        unmountOnExit,
        onEntered,
        onExited
    }

    return fade ?
        <Fade {...fadeProps}>{child}</Fade> :
        <NoTransition {...fadeProps}>{child}</NoTransition>
}