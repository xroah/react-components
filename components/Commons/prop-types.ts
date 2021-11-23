import {
    element,
    number,
    oneOf,
    oneOfType,
    shape,
    string
} from "prop-types";
import {
    alignments,
    orders,
    sizes,
    variants
} from "./consts-and-types";
import {getShape} from "./utils";

export const cssCompPropTypes = {
    className: string,
    children: element.isRequired
}

const orderTypes = [
    oneOf(orders),
    number
]

export const orderPropType = oneOfType([
    ...orderTypes,
    shape(getShape(orderTypes))
])

const spanTypes = [
    // typescript may infer 'auto' is a string or true is a boolean
    oneOf(["auto" as "auto", true as true]),
    number
]
export const colSpanPropType = oneOfType([
    ...spanTypes,
    shape(getShape(spanTypes))
])

export const sizePropType = oneOf(sizes)
export const variantPropType = oneOf(variants)
export const alignmentPropType = oneOf(alignments)

export const formCommPropTypes = {
    labelAlign: alignmentPropType,
    labelCol: colSpanPropType,
    labelSize: sizePropType,
    itemCol: colSpanPropType
}