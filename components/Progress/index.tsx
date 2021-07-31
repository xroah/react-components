import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Variant, variants} from "../Commons/variants"
import {getPrefixFunc} from "../Commons/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number
    striped?: boolean
    animated?: boolean
    label?: boolean
    variant?: Variant
    height?: number
}

export default function Progress(
    {
        value,
        striped,
        animated,
        variant,
        height,
        className,
        label,
        ...restProps
    }: ProgressProps
) {
    const prefix = getPrefixFunc("progress-bar")
    const MIN = 0
    const MAX = 100
    const style: React.CSSProperties = {}
    const classes = classNames(
        className,
        prefix(),
        variant && `bg-${variant}`,
        striped && prefix("striped"),
        striped && animated && prefix("animated")
    )
    const v = value! < MIN ? MIN : value! > MAX ? MAX : value
    const labelEl = style.width = `${v}%`

    if (height) {
        style.height = height
    }

    return (
        <div className="progress" {...restProps}>
            <div className={classes}>{labelEl}</div>
        </div>
    )
}

Progress.propTypes = {
    value: PropTypes.number,
    striped: PropTypes.bool,
    animated: PropTypes.bool,
    label: PropTypes.bool,
    variant: PropTypes.oneOf(variants),
    height: PropTypes.number,
}
Progress.defaultProps = {
    value: 0
}