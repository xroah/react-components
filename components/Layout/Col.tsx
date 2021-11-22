import React, {HTMLAttributes} from "react"
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
    Order,
    OrderBreakpoints
} from "../Commons/consts-and-types"
import {getBreakpointClasses, getShape} from "../Commons/utils"
import {colSpanPropType, orderPropType} from "../Commons/prop-types"
import FlexItem from "../Utilities/Flex/Item"

type OffsetBreakpoints = BreakpointType<Breakpoint, number>

interface ColProps extends HTMLAttributes<HTMLDivElement> {
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
        shape(getShape(number))
    ])
}
Col.defaultProps = {
    span: true
}