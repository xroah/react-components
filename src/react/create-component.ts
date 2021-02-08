import React from "react"
import classNames from "../class-names"

interface CreateProps {
    className?: string
    tag?: string
    displayName: string
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

    Component.displayName = displayName

    return Component
}