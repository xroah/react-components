import * as React from "react"
import {CSSComponentProps} from "@commons/CommonPropsInterface"
import {
    Breakpoint,
    BreakpointType,
    Order,
    OrderBreakpoints,
    ValueOf
} from "@commons/consts-and-types"
import {
    cloneWithClass,
    getBreakpointClasses,
    getShape,
    onlyChild
} from "@commons/utils"
import classNames from "reap-utils/lib/class-names"
import {cssCompPropTypes, orderPropType} from "@commons/prop-types"
import {bool, oneOf, oneOfType, shape} from "prop-types"

const grows = [
    0,
    1
] as const

type GrowType = ValueOf<typeof grows>
type GrowBreakpoints = BreakpointType<Breakpoint, GrowType>
type GrowProp = GrowType | GrowBreakpoints

interface FlexItemProps extends CSSComponentProps {
    fill?: boolean | BreakpointType<Breakpoint, boolean>
    order?: Order | OrderBreakpoints
    grow?: GrowProp
    shrink?: GrowProp
    children: React.ReactElement
}

export default function FlexItem(
    {
        children,
        className,
        fill,
        order,
        grow,
        shrink
    }: FlexItemProps
) {
    const c = onlyChild(children)
    const PREFIX = "flex"
    const classes = classNames(
        getBreakpointClasses(PREFIX, fill, undefined, "fill"),
        getBreakpointClasses("order", order),
        getBreakpointClasses(PREFIX, grow, undefined, "grow"),
        getBreakpointClasses(PREFIX, shrink, undefined, "shrink")
    )

    return cloneWithClass(c, className, classes)
}

const growType = oneOf(grows)
const growPropType = oneOfType([
    growType,
    shape(getShape(growType))
])

FlexItem.propTypes = {
    ...cssCompPropTypes,
    fill: oneOfType([
        bool,
        shape(getShape(bool))
    ]),
    order: orderPropType,
    grow: growPropType,
    shrink: growPropType
}