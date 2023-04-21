import React,
{
    ElementType,
    HTMLAttributes,
    ReactNode,
    isValidElement,
    FC
} from "react"
import { classnames } from "."
import warning from "warning"
import { isFragment } from "react-is"

export function getNullableNode(node?: ReactNode) {
    if (node === null) {
        return null
    }

    if (node) {
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
            children,
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
            },
            children
        )
    }

    if (displayName) {
        component.displayName = displayName
    }

    return component
}

export function isChildrenValidElement(children: ReactNode) {
    if (!isValidElement(children)) {
        warning(
            false,
            "The children must be React element"
        )

        return false
    }

    if (isFragment(children)) {
        warning(
            false,
            "The children can not be fragment"
        )

        return false
    }

    return true
}