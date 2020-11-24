export type variantType = "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark"
    | "light"
export const variantArray = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark"
]

export function reflow(el: HTMLElement) {
    el.offsetHeight
}

export function handleFuncProp(prop?: Function) {
    if (typeof prop !== "function") {
        return () => { }
    }

    return prop
}

export function omit(obj: any, props: string[]) {
    props.forEach(prop => {
        if (prop in obj) {
            delete obj[prop]
        }
    })
}

export function isUndef(v: any) {
    return v === undefined || v === null
}

export {default as chainFunction} from "./chainFunction"
export {default as classNames} from "./classNames"
export {default as createComponentByClass} from "./createComponentByClass"
export {default as emulateTransitionEnd} from "./emulateTransitionEnd"
export {default as getScrollParent} from "./getScrollParent"
export {default as getScrollBarWidth} from "./getScrollBarWidth"
export {default as throttle} from "./throttle"
export {default as mergeRef} from "./mergeRef"
