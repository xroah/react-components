import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import { CommonProps } from "../CommonPropsInterface";
import { ListGroupContext } from "../contexts";

export interface ListGroupProps extends CommonProps<HTMLDivElement> {
    flush?: boolean;
    minWidth?: "sm" | "md" | "lg" | "xl";
    horizontal?: boolean;
    equalWidth?: boolean;
}

export default function ListGroup(props: ListGroupProps) {
    const {
        flush,
        minWidth,
        horizontal,
        className,
        equalWidth,
        ...otherProps
    } = props;
    const PREFIX = "list-group";
    let H_PREFIX = `${PREFIX}-horizontal`;

    return (
        <ListGroupContext.Provider value={!!equalWidth && !!horizontal}>
            <div className={
                classNames(
                    PREFIX,
                    flush && `${PREFIX}-flush`,
                    horizontal ? (minWidth ? `${H_PREFIX}-${minWidth}` : H_PREFIX ) : ""
                )
            } {...otherProps} />
        </ListGroupContext.Provider>
    );
}

ListGroup.propTypes = {
    flush: PropTypes.bool,
    minWidth: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
    horizontal: PropTypes.bool,
    equalWidth: PropTypes.bool
};
ListGroup.defaultProps = {
    horizontal: false,
    flush: false,
    equalWidth: false
};