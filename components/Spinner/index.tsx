import * as React from "react"
import PropTypes from "prop-types"
import {ValueOf, Variant, variants} from "../Commons/consts-and-types"
import omit from "reap-utils/lib/omit"
import classNames from "reap-utils/lib/class-names"

const animations = ["border", "grow"] as const

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: Variant
    type?: ValueOf<typeof animations>
    size?: "sm" | number | string
}

export default function Spinner(
    {
        type,
        variant,
        className,
        size,
        style={},
        ...restProps
    }: SpinnerProps
) {
    const PREFIX = "spinner"
    const sm = size === "sm"
    const typeClass = `${PREFIX}-${type}`
    const classes = classNames(
        className,
        typeClass,
        type && `text-${variant}`,
        sm && `${typeClass}-sm`
    )

    if (size && !sm) {
        style.width = size
        style.height = size
    }

    return (
        <div
            className={classes}
            style={style}
            {...omit(restProps, "children")} />
    )
}

Spinner.defaultProps = {
    type: "border"
}
Spinner.propTypes = {
    type: PropTypes.oneOf(animations),
    variant: PropTypes.oneOf(variants),
    size: PropTypes.oneOfType([
        PropTypes.oneOf(["sm"]),
        PropTypes.number,
        PropTypes.string
    ])
}