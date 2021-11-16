import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {ValueOf, Variant} from "../Commons/consts-and-types"
import {variantPropType} from "@commons/prop-types"

const colors = ["light", "dark"] as const

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: Variant
    pill?: boolean
    textColor?: ValueOf<typeof colors>
}

export default function Badge(
    {
        className,
        variant,
        pill,
        textColor,
        ...restProps
    }: BadgeProps
) {
    const classes = classNames(
        className,
        "badge",
        variant && `bg-${variant}`,
        pill && "rounded-pill",
        textColor && `text-${textColor}`
    )

    return <span className={classes} {...restProps} />
}

Badge.propTypes = {
    variant: variantPropType,
    pill: PropTypes.bool,
    color: PropTypes.oneOf(colors)
}