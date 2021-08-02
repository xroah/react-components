import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"

interface ItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean
    disabled?: boolean
}

export default function PaginationItem(
    {
        active,
        disabled,
        className,
        style,
        children,
        ...restProps
    }: ItemProps
) {
    const classes = classNames(
        className,
        active && "active",
        disabled && "disabled"
    )

    return (
        <li style={style} className={classes}>
            <a className="page-link" {...restProps}>
                {children}
            </a>
        </li>
    )
}