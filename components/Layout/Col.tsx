import * as React from "react"
import PropTypes from "prop-types"
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
import {createComponent} from "reap-utils/lib/react"

type OffsetBreakpoints = BreakpointType<Breakpoint, number>

interface ColProps extends DivAttrs {
    span?: ColSpan | ColSpanBreakpoints
    offset?: number | OffsetBreakpoints
    order?: Order | OrderBreakpoints
}

export default createComponent<ColProps>({
    propTypes: {
        span: colSpanPropType,
        order: orderPropType,
        offset: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape(getBreakpointShape(PropTypes.number))
        ])
    },
    defaultProps: {
        span: true
    },
    propsHandler(
        {
            span,
            offset,
            ...restProps
        }
    ) {
        return {
            className: classNames(
                getBreakpointClasses("col", span),
                getBreakpointClasses("offset", offset)
            ),
            newProps: restProps
        }
    },
    render(
        className,
        {
            order,
            ...restProps
        }
    ) {
        return (
            <FlexItem order={order}>
                <div className={className} {...restProps} />
            </FlexItem>
        )
    }
})