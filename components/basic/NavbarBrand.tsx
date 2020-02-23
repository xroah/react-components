import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

interface NavbarBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    tag?: React.ElementType;
    href?: string;
}

export default function NavbarBrand(props: NavbarBrandProps) {
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