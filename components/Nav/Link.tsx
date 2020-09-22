import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {AnchorCommonProps} from "../Common/CommonPropsInterface"

export interface NavLinkProps extends AnchorCommonProps<HTMLAnchorElement> {
    active?: boolean
    disabled?: boolean
    href?: string
}

export default function NavLink(props: NavLinkProps) {
    const {
        active,
        disabled,
        className,
        onClick,
        ...otherProps
    } = props
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onClick && !disabled && onClick(e)
    }

    return (
        <a className={
            classNames(
                className,
                "nav-link",
                active && "active",
                disabled && "disabled"
            )
        } 
        onClick={handleClick}
        {...otherProps} />
    )
}

NavLink.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string
}
NavLink.defaultProps = {
    active: false,
    disabled: false,
    href: "#"
}