import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantArray,
    variantType,
    createComponentByClass
} from "../utils";
import Collapse, { CollapseProps } from "./Collapse";

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

    return <nav className={classes} {...otherProps} />;
}

interface NavbarBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    tag?: string;
}

function NavbarBrand(props: NavbarBrandProps) {
    const {
        className,
        tag = "a",
        ...otherProps
    } = props;

    if (tag === "a" && !otherProps.href) {
        otherProps.href = "#";
    }

    return React.createElement(
        tag,
        {
            className: classNames(className, "navbar-brand"),
            ...otherProps
        }
    );
}

Navbar.propTypes = {
    variant: PropTypes.oneOf(["light", "dark"]),
    bg: PropTypes.oneOf(variantArray),
    expand: PropTypes.oneOf(["sm", "md", "lg", "xl", true, false])
};
Navbar.defaultProps = {
    expand: "md",
    variant: "light"
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
                classNames(className, "navbar-collapse")
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
            className={
                classNames(className, "navbar-toggler")
            }
            type={type}
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