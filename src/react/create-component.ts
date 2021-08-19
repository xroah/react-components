import {
    createElement,
    ElementType,
    HTMLAttributes
} from "react"
import classNames from "../class-names"

interface CreateOptions {
    className?: string
    tag?: ElementType
    displayName?: string
}

export default function createComponent<T extends HTMLAttributes<HTMLElement>>(
    {
        className,
        tag = "div",
        displayName
    }: CreateOptions,
) {
    const Component = (
        {
            className: c,
            ...restProps
        }: T
    ) => {
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
