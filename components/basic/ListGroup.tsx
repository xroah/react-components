import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import ListGroupItem from "./ListGroupItem";

export interface ListGroupProps extends React.HTMLAttributes<HTMLElement> {
    flush?: boolean;
    minWidth?: "sm" | "md" | "lg" | "xl";
    horizontal?: boolean;
}

export default function ListGroup(props: ListGroupProps) {
    const {
        flush,
        minWidth,
        horizontal,
        className,
        ...otherProps
    } = props;
    const PREFIX = "list-group";
    let H_PREFIX = `${PREFIX}-horizontal`;

    return (
        <div className={
            classNames(
                PREFIX,
                flush && `${PREFIX}-flush`,
                horizontal && minWidth ? `${H_PREFIX}-${minWidth}` : horizontal ? H_PREFIX : ""
            )
        } {...otherProps}/>
    );
}

ListGroup.propTypes = {
    flush: PropTypes.bool,
    minWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    horizontal: PropTypes.bool
};
ListGroup.defaultProps = {
    horizontal: false,
    flush: false
};

ListGroup.Item = ListGroupItem;