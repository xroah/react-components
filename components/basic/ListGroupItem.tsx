import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantType,
    variantArray
} from "../utils";
import { CommonProps } from "../CommonPropsInterface";

export interface ListGroupItemProps extends CommonProps<HTMLElement> {
    action?: boolean;
    active?: boolean;
    variant?: variantType;
    disabled?: boolean;
    href?: string;
    equalWidth?: boolean;
}

export default function ListGroupItem(props: ListGroupItemProps) {
    const {
        action,
        active,
        disabled,
        variant,
        href,
        className,
        equalWidth,
        ...otherProps
    } = props;
    const PREFIX = `list-group-item`;
    let tag = href ? "a" : action ? "button" : "div";

    return React.createElement(
        tag,
        {
            href: tag === "a" ? href : undefined,
            disabled: tag === "button" ? disabled : undefined,
            className: classNames(
                className,
                PREFIX,
                variant && `${PREFIX}-${variant}`,
                action && `${PREFIX}-action`,
                disabled && "disabled",
                active && "active",
                equalWidth && "flex-fill"
            ),
            ...otherProps
        }
    );

}

ListGroupItem.propTypes = {
    variant: PropTypes.oneOf(variantArray),
    href: PropTypes.string,
    action: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    equalWidth: PropTypes.bool
};
ListGroupItem.defaultProps = {
    action: false,
    active: false,
    disabled: false,
    equalWidth: false
};