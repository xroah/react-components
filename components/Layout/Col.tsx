import React, {HTMLAttributes} from "react"
import {
    number,
    oneOf,
    oneOfType,
    shape
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    Breakpoint,
    BreakpointType,
    ValueOf
} from "../Commons/consts-and-types"
import {getBreakpointClasses} from "../Commons/utils"

const orders = ["first", "last"] as const

type Span = "auto" | number | true
type SpanBreakpoints = BreakpointType<Breakpoint, Span>
type Order = ValueOf<typeof orders> | number
type OrderBreakpoints = BreakpointType<Breakpoint, Order>
type OffsetBreakpoints = BreakpointType<Breakpoint, number>

interface ColProps extends HTMLAttributes<HTMLDivElement> {
    span: Span | SpanBreakpoints
    offset?: number | OffsetBreakpoints
    order?: Order | OrderBreakpoints
}

export default function Col(
    {
        className,
        span,
        order,
        offset,
        ...restProps
    }: ColProps
) {
    const classes = classNames(
        className,
        getBreakpointClasses("col", span),
        getBreakpointClasses("order", order),
        getBreakpointClasses("offset", offset)
    )

    return <div className={classes} {...restProps}/>
}

Col.defaultProps = {
    span: true
}