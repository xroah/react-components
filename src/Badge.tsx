import * as React from "react";
import {classNames, variantType, variantArray} from "./utils";
import PropTypes from "prop-types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement & HTMLAnchorElement> {
    variant?: variantType;
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
    variant: PropTypes.oneOf(variantArray),
    pill: PropTypes.bool,
    href: PropTypes.string
};