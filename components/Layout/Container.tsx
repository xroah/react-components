import * as React from "react"
import {bool, oneOf} from "prop-types"
import {breakpoints, Breakpoint} from "../Commons/consts-and-types"
import classNames from "reap-utils/lib/class-names"
import {getBreakpointPrefixFunc, getPrefixFunc} from "../Commons/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    fluid?: boolean
    breakpoint?: Breakpoint
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
    const breakpointPrefix = getBreakpointPrefixFunc(prefix(), breakpoint)
    const classes = classNames(
        className,
        fluid ?
            prefix("fluid") :
            breakpointPrefix()
    )

    return <div className={classes} {...restProps} />
}

Container.propTypes = {
    fluid: bool,
    breakpoint: oneOf(breakpoints)
}