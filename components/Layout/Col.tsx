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
    OrderBreakpoints
} from "../Commons/consts-and-types"
import {getBreakpointClasses, getShape} from "../Commons/utils"
import {orderPropType} from "@commons/prop-types"
import FlexItem from "../Utilities/Flex/Item"

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
        getBreakpointClasses("offset", offset)
    )

    return (
        <FlexItem order={order}>
            <div className={classes} {...restProps}/>
        </FlexItem>
    )
}

const spanTypes = [
    oneOf(["auto", true]),
    number
]

Col.propTypes = {
    span: oneOfType([
        ...spanTypes,
        shape(getShape(oneOfType(spanTypes)))
    ]),
    order: orderPropType,
    offset: oneOfType([
        number,
        shape(getShape(number))
    ])
}
Col.defaultProps = {
    span: true
}