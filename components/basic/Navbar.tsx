import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantArray,
    variantType,
    createComponentByClass
} from "../utils";
import Collapse, { CollapseProps } from "./Collapse";
import { NavbarContext } from "../contexts";
import NavbarBrand from "./NavbarBrand";
import { CommonProps, ButtonCommonProps } from "../CommonPropsInterface";

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

Navbar.Brand = NavbarBrand;
Navbar.Collapse = function NavbarCollapse(props: CollapseProps) {
    const {
        className,
        ...otherProps
    } = props;

    return (
        <Collapse className={
            classNames(
                className,
                "navbar-collapse"
            )
        } {...otherProps} />
    )
}
Navbar.Toggle = function NavbarToggle(props: ButtonCommonProps<HTMLButtonElement>) {
    const {
        className,
        type = "button",
        children,
        ...otherProps
    } = props;

    return (
        <button
            type={type}
            className={
                classNames(
                    className,
                    "navbar-toggler"
                )
            } {...otherProps}>
            <span className="navbar-toggler-icon" />
            {children}
        </button>
    );
}
Navbar.Text = createComponentByClass({
    tag: "span",
    displayName: "NavbarText",
    className: "navbar-text"
});