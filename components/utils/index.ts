export type variantType = "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light";
export const variantArray = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
];

export { default as chainFunction } from "./chainFunction";
export { default as classNames } from "./classNames";
export { default as createComponentByClass } from "./createComponentByClass";
export { default as delObjProps } from "./delObjProps";
export { default as emulateTransitionEnd } from "./emulateTransitionEnd";
export { default as getScrollParent } from "./getScrollParent";
export { default as getScrollBarWidth } from "./getScrollBarWidth";
export { default as handleFuncProp } from "./handleFuncProp";
export { default as reflow } from "./reflow";
export { default as throttle } from "./throttle";
