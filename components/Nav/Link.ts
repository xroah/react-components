import {bool} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {AnchorAttrs, ButtonAttrs} from "../Commons/consts-and-types"

interface NavLinkProps extends AnchorAttrs {
    active?: boolean
    disabled?: boolean
    tag?: "a" | "button"
}

const NavLink: React.FunctionComponent<NavLinkProps> = (
    {
        active,
        disabled,
        className,
        tag,
        ...restProps
    }: NavLinkProps
) => {
    const classes = classNames(
        className,
        "nav-link",
        active && "active",
        disabled && "disabled"
    )
    const props: ButtonAttrs = {}

    if (tag === "button") {
        props.disabled = disabled
    }

    return React.createElement(
        tag!,
        {
            className: classes,
            ...restProps,
            ...props
        }
    )
}

NavLink.propTypes = {
    active: bool,
    disabled: bool
}

NavLink.defaultProps = {
    tag: "a"
}

export default NavLink