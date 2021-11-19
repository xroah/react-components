import {
    element,
    number,
    oneOf,
    oneOfType,
    shape,
    string
} from "prop-types";
import {
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

export const sizePropType = oneOf(sizes)
export const variantPropType = oneOf(variants)