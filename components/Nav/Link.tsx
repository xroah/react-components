import {bool} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    active?: boolean
    disabled?: boolean
}

export default function NavLink(
    {
        active,
        disabled,
        className,
        ...restProps
    }: NavLinkProps
) {
    const classes = classNames(
        className,
        "nav-link",
        active && "active",
        disabled && "disabled"
    )

    return <a className={classes} {...restProps}/>
}

NavLink.propTypes = {
    active: bool,
    disabled: bool
}