import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantArray,
    variantType
} from "../../utils";
import { NavbarContext } from "../../contexts";
import { CommonProps  } from "../../CommonPropsInterface";

export interface NavbarProps extends CommonProps<HTMLElement> {
    variant?: "light" | "dark";
    bg?: variantType;
    expand?: "sm" | "md" | "lg" | "xl" | boolean;
}

export default function Navbar(props: NavbarProps) {
    const {
        className,
        bg,
        variant,
        expand,
        ...otherProps
    } = props;
    const EXPAND_PREFIX = "navbar-expand";
    const classes = classNames(
        className,
        "navbar",
        bg && `bg-${bg}`,
        variant && `navbar-${variant}`,
        expand && (expand === true ? EXPAND_PREFIX : `${EXPAND_PREFIX}-${expand}`)
    );

    return (
        <NavbarContext.Provider value={true}>
            <nav className={classes} {...otherProps} />
        </NavbarContext.Provider>
    );
}

Navbar.propTypes = {
    variant: PropTypes.oneOf(["light", "dark"]),
    bg: PropTypes.oneOf(variantArray),
    expand: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(["sm", "md", "lg", "xl"])
    ])
};
Navbar.defaultProps = {
    expand: false,
    variant: "light"
};