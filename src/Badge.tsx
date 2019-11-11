import * as React from "react";
import {classNames} from "./utils";
import PropTypes from "prop-types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement & HTMLAnchorElement> {
    variant?: "primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "light" |
        "dark";
    href?: string;
    pill?: boolean;
}

export default function Badge(props: BadgeProps) {
    const {
        className,
        variant,
        pill,
        href,
        children,
        ...otherProps
    } = props;
    const classes = classNames(
        className,
        "badge",
        variant && `badge-${variant}`,
        pill && "badge-pill"
    );
    let tag = "span";

    if (href) {
        tag = "a";
    }

    return React.createElement(
        tag,
        {
            href,
            className: classes,
            ...otherProps
        },
        children
    );
}

Badge.propTypes = {
    variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark"
    ]),
    pill: PropTypes.bool,
    href: PropTypes.string
};