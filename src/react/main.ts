import {noop} from "../main"

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