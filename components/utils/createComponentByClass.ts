import React, {FunctionComponent} from "react"
import classNames from "./classNames"

interface CreateProps {
    className?: string
    tag?: string
    displayName?: string
}

export default (options: CreateProps) => {
    const {
        className,
        tag = "div",
        displayName
    } = options
    const Component = (props: React.AllHTMLAttributes<HTMLElement>) => {
        const {
            className: cls,
            ...otherProps
        } = props

        return React.createElement(
            tag,
            {
                className: classNames(className, cls),
                ...otherProps
            }
        )
    }

    if (displayName) {
        Component.displayName = displayName
    }

    return Component
}