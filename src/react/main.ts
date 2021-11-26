import * as React from "react"
import {noop} from "../main"

export function getNextNodeByRef(ref: React.RefObject<HTMLElement>) {
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

export function mergeRef(...refs: React.Ref<unknown>[]) {
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

export function only(child: React.ReactElement) {
    return React.Children.only(child)
}