import {
    element,
    number,
    oneOf,
    oneOfType,
    shape,
    string
} from "prop-types";
import {orders} from "./consts-and-types";
import {getShape} from "./utils";

export const cssCompPropTypes = {
    className: string,
    children: element
}

const orderTypes = [
    oneOf(orders),
    number
]

export const orderPropType = oneOfType([
    ...orderTypes,
    shape(getShape(oneOfType(orderTypes)))
])