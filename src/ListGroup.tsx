import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "./utils";
import ListGroupItem from "./ListGroupItem";

export interface ListGroupProps extends React.HTMLAttributes<HTMLElement> {
    flush?: boolean;
    tag?: string;
    minWidth?: "sm" | "md" | "lg" | "xl";
    horizontal?: boolean;
}

export default function ListGroup(props: ListGroupProps) {
    const {
        flush,
        tag = "div",
        minWidth,
        horizontal,
        className,
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
                _horizontal && minWidth && `${PREFIX}-horizontal-${minWidth}`
            ),
            ...otherProps
        }
    )
}

ListGroup.propTypes = {
    flush: PropTypes.bool,
    tag: PropTypes.string,
    minWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    horizontal: PropTypes.bool
};
ListGroup.defaultProps = {
    tag: "div"
};

ListGroup.Item = ListGroupItem;