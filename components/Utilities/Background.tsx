import {bool, oneOf} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {BgColor, bgColors} from "../Commons/consts-and-types"
import {cloneWithClass, onlyChild} from "../Commons/utils"
import {CSSComponentProps} from "@commons/CommonPropsInterface"
import {cssCompPropTypes} from "@commons/prop-types"

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
    const c = onlyChild(children)
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