import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {Size, sizes} from "../Commons/consts-and-types"

interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: Size
    vertical?: boolean
}

export default function ButtonGroup(
    {
        size,
        vertical,
        className,
        ...restProps
    }: GroupProps
) {
    const PREFIX = "btn-group"
    const classes = classNames(
        className,
        size && `${PREFIX}-${size}`,
        vertical ? `${PREFIX}-vertical` : PREFIX
    )

    return <div className={classes} {...restProps} />
}

ButtonGroup.defaultProps = {
    vertical: false
}
ButtonGroup.propTypes = {
    vertical: PropTypes.bool,
    size: PropTypes.oneOf(sizes)
}
