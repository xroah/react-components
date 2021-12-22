import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {AnchorAttrs, StatusProps} from "../Commons/consts-and-types"

export default function PaginationItem(
    {
        active,
        disabled,
        className,
        style,
        href,
        children,
        ...restProps
    }: StatusProps & AnchorAttrs
) {
    const classes = classNames(
        className,
        "page-item",
        active && "active",
        disabled && "disabled"
    )

    return (
        <li style={style} className={classes}>
            <a href={href} className="page-link" {...restProps}>
                {children}
            </a>
        </li>
    )
}

PaginationItem.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool
}
PaginationItem.defaultProps = {
    href: "#"
}