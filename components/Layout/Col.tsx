import * as React from "react"
import {
    number,
    oneOfType,
    shape
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    Breakpoint,
    BreakpointType,
    ColSpan,
    ColSpanBreakpoints,
    DivAttrs,
    Order,
    OrderBreakpoints
} from "../Commons/consts-and-types"
import {getBreakpointClasses, getBreakpointShape} from "../Commons/utils"
import {colSpanPropType, orderPropType} from "../Commons/prop-types"
import FlexItem from "../Utilities/Flex/Item"

type OffsetBreakpoints = BreakpointType<Breakpoint, number>

interface ColProps extends DivAttrs {
    span: ColSpan | ColSpanBreakpoints
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



Col.propTypes = {
    span: colSpanPropType,
    order: orderPropType,
    offset: oneOfType([
        number,
        shape(getBreakpointShape(number))
    ])
}
Col.defaultProps = {
    span: true
}