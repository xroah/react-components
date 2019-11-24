import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
    active?: boolean;
    disabled?: boolean;
    href?: string;
}

export default function NavItem(props: NavItemProps) {
    const {
        active,
        disabled,
        className,
        href = "#",
        ...otherProps
    } = props;

    return (
        <a
            className={
                classNames(
                    className,
                    "nav-item",
                    "nav-link",
                    active && "active",
                    disabled && "disabled"
                )
            }
            href={href}
            {...otherProps} />
    );
}

NavItem.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    href: PropTypes.string
};