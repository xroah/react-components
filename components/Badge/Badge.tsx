import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {
    ValueOf,
    Variant,
    variants
} from "../Commons/consts-and-types"

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
    return (
        <span
            className={
                classNames(
                    className,
                    "badge",
                    variant && `bg-${variant}`,
                    pill && "rounded-pill",
                    textColor && `text-${textColor}`
                )
            }
            {...restProps} />
    )
}

Badge.propTypes = {
    variant: PropTypes.oneOf(variants),
    pill: PropTypes.bool,
    color: PropTypes.oneOf(colors)
}