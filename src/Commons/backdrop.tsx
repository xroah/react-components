import * as React from "react"
import {Fade} from "reap-utils/lib/react"

interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
    visible?: boolean
}

export default function Backdrop(
    {
        className,
        visible,
        ...restProps
    }: BackdropProps
) {
    return (
        <Fade in={!!visible}>
            <div className={className} {...restProps} />
        </Fade>
    )
}