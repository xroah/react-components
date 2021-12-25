import * as React from "react"
import {bool, oneOf} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    BgColor,
    bgColors,
    CSSComponentProps
} from "../Commons/consts-and-types"
import {cloneWithClass} from "../Commons/utils"
import {cssCompPropTypes} from "../Commons/prop-types"
import {only} from "reap-utils/lib/react"

interface BgProps extends CSSComponentProps {
    variant?: BgColor
    gradient?: boolean
}

export default function Background(
    {
        variant,
        gradient,
        children,
        className
    }: BgProps
) {
    const c = only(children)
    const classes = classNames(
        variant && `bg-${variant}`,
        gradient && "bg-gradient"
    )

    return cloneWithClass(c, className, classes)
}

Background.propTypes = {
    ...cssCompPropTypes,
    variant: oneOf(bgColors),
    gradient: bool
}