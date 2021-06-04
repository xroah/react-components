import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {Variant, Variants} from "../Commons/Variants"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: Variant
    pill?: boolean
    color?: "light" | "dark"
}

export default function Badge(props: BadgeProps) {
    const {
        className,
        variant,
        pill,
        color,
        ...restProps
    } = props

    return (
        <span
            className={
                classNames(
                    className,
                    "badge",
                    variant && `bg-${variant}`,
                    pill && "rounded-pill",
                    color && `text-${color}`
                )
            }
            {...restProps} />
    )
}

Badge.propTypes = {
    variant: PropTypes.oneOf(Variants),
    pill: PropTypes.bool,
    color: PropTypes.oneOf(["light", "dark"])
}
Badge.defaultProps = {
    pill: false
}