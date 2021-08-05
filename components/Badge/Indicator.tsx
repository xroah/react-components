import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {Variant, variants} from "../Commons/variants"
import omit from "reap-utils/lib/omit"
import Badge from "./Badge"

interface IndicatorProps extends React.HTMLAttributes<HTMLElement> {
    size?: number | string
    variant?: Variant
}

export default function Indicator(
    {
        className,
        size,
        style = {},
        ...restProps
    }: IndicatorProps
) {
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

Indicator.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    variant: PropTypes.oneOf(variants)
}
Indicator.defaultProps = {
    size: 16,
    variant: "danger"
}