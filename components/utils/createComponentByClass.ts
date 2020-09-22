import React from "react"
import classNames from "./classNames"

interface CreateProps {
    className?: string
    tag?: string
    displayName?: string
}

export default (options: CreateProps) => {
    const {
        className, tag = "div", displayName 
    } = options

    const Comp: any = (props: React.AllHTMLAttributes<HTMLElement>) => {
        const {
            className: _className, ...otherProps 
        } = props

        return React.createElement(
            tag,
            {
                className: classNames(className, _className),
                ...otherProps
            }
        )
    }

    if (displayName) {
        Comp.displayName = displayName
    }

    return Comp
}