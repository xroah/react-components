import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "./utils";

export interface ListGroupProps extends React.HTMLAttributes<HTMLElement> {
    flush?: boolean;
    tag?: string;
    minWidth?: "sm" | "md" | "lg" | "xl";
    horizontal?: boolean;
    equalWidth?: boolean;
}

export default function ListGroup(props: ListGroupProps) {
    const {
        flush,
        tag = "div",
        minWidth,
        horizontal,
        className,
        equalWidth,
        ...otherProps
    } = props;
    const PREFIX = "list-group";
    const _horizontal = horizontal && `${PREFIX}-horizontal`;

    return React.createElement(
        tag,
        {
            className: classNames(
                PREFIX,
                flush && `${PREFIX}-flush`,
                _horizontal,
                _horizontal && minWidth && `${PREFIX}-horizontal-${minWidth}`,
                equalWidth && "flex-fill"
            ),
            ...otherProps
        }
    )
}

ListGroup.propTypes = {
    flush: PropTypes.bool,
    tag: PropTypes.string,
    minWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    horizontal: PropTypes.bool,
    equalWidth: PropTypes.bool
};
ListGroup.defaultProps = {
    tag: "div"
};