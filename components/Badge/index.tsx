import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {Variant, Variants} from "../Commons/Variants"
import omit from "reap-utils/lib/omit"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: Variant
    pill?: boolean
    textColor?: "light" | "dark"
}

export default function Badge(props: BadgeProps) {
    const {
        className,
        variant,
        pill,
        textColor,
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
                    textColor && `text-${textColor}`
                )
            }
            {...restProps} />
    )
}

Badge.Positioned = function Positioned(
    {
        className,
        pill = true,
        variant = "danger",
        ...restProps
    }: BadgeProps
) {
    const classes = classNames(
        className,
        "position-absolute",
        "top-0",
        "start-100",
        "translate-middle"
    )

    return (
        <Badge
            className={classes}
            pill={true}
            variant={variant}
            {...restProps}
        />
    )
}

interface IndicatorProps extends React.HTMLAttributes<HTMLElement> {
    size?: number
    variant?: Variant
}

function Indicator({
    className,
    size,
    style = {},
    ...restProps
}: IndicatorProps) {
    const classes = classNames(
        className,
        "position-absolute",
        "top-0",
        "start-100",
        "translate-middle",
        "border",
        "border-light",
        "rounded-circle",
        "p-0"
    )

    style.width = style.height = size

    return (
        <Badge
            className={classes}
            style={style}
            {...omit(restProps, "children")}>
            <span className="visually-hidden"></span>
        </Badge>
    )
}

Badge.Indicator = Indicator

Badge.propTypes = {
    variant: PropTypes.oneOf(Variants),
    pill: PropTypes.bool,
    color: PropTypes.oneOf(["light", "dark"])
}
Badge.defaultProps = {
    pill: false
}

Indicator.propTypes = {
    size: PropTypes.number,
    variant: PropTypes.oneOf(Variants)
}
Indicator.defaultProps = {
    size: 16,
    variant: "danger"
}