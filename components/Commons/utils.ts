import {
    createElement,
    ElementType,
    HTMLAttributes
} from "react"
import classNames from "reap-utils/lib/class-names"
import {PrefixFunc} from "./consts-and-types"



export function getPrefixFunc(prefix: string): PrefixFunc {
    return (s?: string | number) => s ? `${prefix}-${s}` : prefix
}

export function isValidNode(node: any) {
    return node !== null &&
        node !== undefined &&
        typeof node !== "boolean"
}

interface CreateOptions {
    className?: string
    tag?: ElementType
    displayName?: string
}

export function createComponent<T extends HTMLAttributes<HTMLElement>>(
    {
        className,
        tag = "div",
        displayName
    }: CreateOptions,
) {
    const Component = ({
        className: c,
        ...restProps
    }: T) => {
        return createElement(
            tag,
            {
                className: classNames(className, c),
                ...restProps
            }
        )
    }

    if (displayName) {
        Component.displayName = displayName
    }

    return Component
}