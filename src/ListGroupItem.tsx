import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantType,
    variantArray
} from "./utils";

export interface ListGroupItemProps extends React.HTMLAttributes<HTMLElement> {
    action?: boolean;
    tag?: string;
    active?: boolean;
    variant?: variantType;
    disabled?: boolean;
    href?: string;
}

export default function ListGroupItem(props: ListGroupItemProps) {
    const {
        action,
        tag,
        active,
        disabled,
        variant,
        href,
        className,
        ...otherProps
    } = props;
    let _tag = tag || (
        action ? (
            href ? "a" : "button"
        ) : "div"
    );

    const el = document.createElement(_tag);
    const PREFIX = `list-group-item`;

    return React.createElement(
        _tag,
        {
            href,
            disabled: (disabled && "disabled" in el) ? true : undefined,
            className: classNames(
                className,
                PREFIX,
                variant && `${PREFIX}-${variant}`,
                action && `${PREFIX}-action`,
                disabled && "disabled",
                active && "active"
            ),
            ...otherProps
        }
    );

}

ListGroupItem.propTypes = {
    variant: PropTypes.oneOf(variantArray),
    tag: PropTypes.string,
    href: PropTypes.string,
    action: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool
};