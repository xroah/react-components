import * as React from "react"
import {bool, oneOf} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {BgColor, bgColors} from "../Commons/consts-and-types"

interface BgProps {
    variant?: BgColor
    gradient?: boolean
    className?: string
    children: React.ReactElement
}

export default function Background(
    {
        variant,
        gradient,
        children,
        className
    }: BgProps
) {
    const c = React.Children.only(children)
    const classes = classNames(
        className,
        c.props.className,
        variant && `bg-${variant}`,
        gradient && "bg-gradient"
    )

    return React.cloneElement(c, {className: classes})
}

Background.propTypes = {
    variant: oneOf(bgColors),
    gradient: bool
}