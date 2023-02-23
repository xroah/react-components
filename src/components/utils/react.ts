import {
    ElementType,
    ReactNode,
    createElement,
    isValidElement
} from "react";

export function getNullableNode(
    node?: ReactNode,
    wrapperTag?: ElementType,
    className?: string,
): ReactNode | false {
    if (node === null) {
        return null
    }

    if (node) {
        if (isValidElement(node)) {
            return node
        }

        if (wrapperTag) {
            return createElement(
                wrapperTag,
                {
                    className,
                    children: node
                }
            )
        }

        return node
    }

    return false
}