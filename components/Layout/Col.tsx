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
    Order,
    OrderBreakpoints,
    orders
} from "../Commons/consts-and-types"
import {getBreakpointClasses, getShape} from "../Commons/utils"

type Span = "auto" | number | true
type SpanBreakpoints = BreakpointType<Breakpoint, Span>
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

const spanTypes = [
    oneOf(["auto", true]),
    number
]
const orderTypes = [
    oneOf(orders),
    number
]

Col.propTypes = {
    span: oneOfType([
        ...spanTypes,
        shape(getShape(oneOfType(spanTypes)))
    ]),
    order: oneOfType([
        ...orderTypes,
        shape(getShape(oneOfType(orderTypes)))
    ]),
    offset: oneOfType([
        number,
        shape(getShape(number))
    ])
}
Col.defaultProps = {
    span: true
}