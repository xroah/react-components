import * as React from "react"
import {Fade} from "reap-utils/lib/react"
import {Cb} from "./common-types"

interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
    visible?: boolean
    onExited?: Cb
}

export default function Backdrop(
    {
        className,
        visible,
        onExited,
        ...restProps
    }: BackdropProps
) {
    return (
        <Fade in={!!visible} onExited={onExited}>
            <div className={className} {...restProps} />
        </Fade>
    )
}