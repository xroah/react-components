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

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
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
            <nav className={classes}
                {...otherProps} />
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

interface NavbarBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    tag?: React.ElementType;
    href?: string;
}

function NavbarBrand(props: NavbarBrandProps) {
    const {
        className,
        tag,
        ...otherProps
    } = props;

    return React.createElement(
        tag as React.ElementType,
        {
            className: classNames(className, "navbar-brand"),
            ...otherProps
        }
    );
}

NavbarBrand.propTypes = {
    tag: PropTypes.elementType
};
NavbarBrand.defaultProps = {
    tag: "a"
};

Navbar.Brand = NavbarBrand;
Navbar.Collapse = function NavbarCollapse(props: CollapseProps) {
    const {
        className,
        ...otherProps
    } = props;

    return (
        <Collapse
            className={
                classNames(
                    className,
                    "navbar-collapse"
                )
            }
            {...otherProps} />
    )
}
Navbar.Toggle = function NavbarToggle(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const {
        className,
        type = "button",
        ...otherProps
    } = props;

    delete otherProps.children;

    return (
        <button
            type={type}
            className={
                classNames(
                    className,
                    "navbar-toggler"
                )
            }
            {...otherProps}>
            <span className="navbar-toggler-icon" />
        </button>
    );
}
Navbar.Text = createComponentByClass({
    tag: "span",
    displayName: "NavbarText",
    className: "navbar-text"
});