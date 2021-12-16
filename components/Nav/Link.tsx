import {bool} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {AnchorAttrs} from "../Commons/consts-and-types"

interface NavLinkProps extends AnchorAttrs {
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