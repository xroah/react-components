import React,
{
    ElementType,
    HTMLAttributes,
    ReactNode,
    createElement,
    isValidElement,
    FC
} from "react"
import { classnames } from "."

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

export function createComponentByClassName<
    T extends HTMLElement,
    P extends HTMLAttributes<T>
>(
    className: string,
    tag: ElementType = "div",
    displayName?: string
): FC<P> {
    const component: FC<P> = (
        {
            className: propClassName,
            ...restProps
        }
    ) => {
        return React.createElement(
            tag,
            {
                className: classnames(
                    propClassName,
                    className
                ),
                ...restProps
            }
        )
    }

    if (displayName) {
        component.displayName = displayName
    }

    return component
}