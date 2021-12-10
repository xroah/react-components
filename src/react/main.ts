import {
    RefObject,
    Ref,
    Children,
    ReactElement
} from "react"
import {isFragment} from "react-is"
import {noop} from "../main"

export function getNextNodeByRef(ref: RefObject<HTMLElement>) {
    if (!ref.current) {
        return null
    }

    return ref.current.nextElementSibling
}

export function isValidNode(node: unknown) {
    return node !== null &&
        node !== undefined &&
        typeof node !== "boolean"
}

export function mergeRef(...refs: Ref<unknown>[]) {
    return (node: unknown) => {
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

export function only(child: ReactElement, acceptFragment = false) {
    const c = Children.only(child)

    if (!acceptFragment) {
        if (isFragment(c)) {
            throw new Error("The children can not be a fragment")
        }
    }

    return c
}