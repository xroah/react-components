import * as React from "react"
import {bool, oneOf} from "prop-types"
import {ValueOf} from "../Commons/consts-and-types"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc} from "../Commons/utils"

const breakpoints = [
    "sm",
    "md",
    "lg",
    "xl",
    "xxl"
] as const

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    fluid?: boolean
    breakpoint?: ValueOf<typeof breakpoints>
}

export default function Container(
    {
        className,
        fluid,
        breakpoint,
        ...restProps
    }: ContainerProps
) {
    const prefix = getPrefixFunc("container")
    const classes = classNames(
        className,
        fluid ? prefix("fluid") : prefix(),
        breakpoint && prefix(breakpoint)
    )

    return <div className={classes} {...restProps} />
}

Container.propTypes = {
    fluid: bool,
    breakpoint: oneOf(breakpoints)
}