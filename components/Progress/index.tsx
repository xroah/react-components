import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Variant} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {variantPropType} from "@commons/prop-types"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    striped?: boolean
    animated?: boolean
    label?: boolean
    variant?: Variant
    height?: number
    __isChild__?: boolean
}

export default function Progress(
    {
        value,
        striped,
        animated,
        variant,
        height,
        style = {},
        className,
        label,
        __isChild__,
        children,
        ...restProps
    }: ProgressProps
) {
    const prefix = getPrefixFunc("progress-bar")
    const MIN = 0
    const MAX = 100
    const barStyle: React.CSSProperties = {}
    const classes = classNames(
        prefix(),
        variant && `bg-${variant}`,
        striped && prefix("striped"),
        striped && animated && prefix("animated")
    )
    const v = value! < MIN ? MIN : value! > MAX ? MAX : value
    const labelEl = barStyle.width = `${v}%`
    const bar = (
        <div style={barStyle} className={classes}>
            {label ? labelEl : null}
        </div>
    )

    if (height) {
        style.height = height
    }

    if (__isChild__) {
        return bar
    }

    const _children = React.Children.map(children, function (c, index) {
        if (React.isValidElement(c)) {
            return React.cloneElement(c, {__isChild__: true})
        }

        return c
    })

    return (
        <div
            style={style}
            className={classNames(className, "progress")}
            {...restProps}>
            {_children ? _children : bar}
        </div>
    )
}

Progress.propTypes = {
    value: PropTypes.number,
    striped: PropTypes.bool,
    animated: PropTypes.bool,
    label: PropTypes.bool,
    variant: variantPropType,
    height: PropTypes.number,
}
Progress.defaultProps = {
    value: 0
}