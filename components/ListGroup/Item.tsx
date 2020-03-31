import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantType,
    variantArray
} from "../utils";
import { CommonProps } from "../CommonPropsInterface";
import { ListGroupContext } from "../contexts";

export interface ListGroupItemProps extends CommonProps<HTMLElement> {
    action?: boolean;
    active?: boolean;
    variant?: variantType;
    disabled?: boolean;
    href?: string;
}

export default function ListGroupItem(props: ListGroupItemProps) {
    const {
        action,
        active,
        disabled,
        variant,
        href,
        className,
        ...otherProps
    } = props;
    const PREFIX = `list-group-item`;
    let tag = href ? "a" : action ? "button" : "div";

    return (
        <ListGroupContext.Consumer>
            {
                equalWidth => (
                    React.createElement(
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
                    )
                )
            }
        </ListGroupContext.Consumer>
    );

}

ListGroupItem.propTypes = {
    variant: PropTypes.oneOf(variantArray),
    href: PropTypes.string,
    action: PropTypes.bool,
    active: PropTypes.bool,
    disabled: PropTypes.bool
};
ListGroupItem.defaultProps = {
    action: false,
    active: false,
    disabled: false
};