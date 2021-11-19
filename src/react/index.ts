import {noop} from ".."

export {default as Transition} from "./transition/Transition"
export {default as CSSTransition} from "./transition/CSSTransition"
export {default as Fade} from "./transition/Fade"
export {default as NoTransition} from "./transition/NoTransition"
export {default as createComponent} from "./create-component"
export {default as Placeholder} from "./Placeholder"
export {default as Portal} from "./Portal"

export function getNextNodeByRef(ref: React.RefObject<HTMLElement>) {
    if (!ref.current) {
        return null
    }

    return ref.current.nextElementSibling
}

export function isValidNode(node: any) {
    return node !== null &&
        node !== undefined &&
        typeof node !== "boolean"
}

export function mergeRef(...refs: React.Ref<any>[]) {
    return (node: any) => {
        refs.forEach((ref: any) => {
            if (ref) {
                if ("current" in ref) {
                    ref.current = node
                } else if (typeof ref === "function") {
                    ref(node)
                }
            }
        })
    }
}

export function handleFuncProp(prop?: Function) {
    if (typeof prop !== "function") {
        return noop
    }

    return prop
}