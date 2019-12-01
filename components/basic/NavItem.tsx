import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface NavItemProps extends React.HTMLAttributes<HTMLElement> {
    tag?: string;
}

export default function NavItem(props: NavItemProps) {
    const {
        tag = "li",
        className,
        ...otherProps
    } = props;
    
    return React.createElement(
        tag,
        {
            className: classNames(className, "nav-item"),
            ...otherProps
        }
    );
}


NavItem.propTypes = {
    tag: PropTypes.string
}