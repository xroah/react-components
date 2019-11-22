import * as React from "react";
import PropTypes from "prop-types";
import {classNames} from "../utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement>{
    size?: "sm" | "lg";
    vertical?: boolean;
}

export default function ButtonGroup(props: ButtonGroupProps) {
    const {
        className,
        size,
        vertical,
        children,
        ...otherProps
    } = props;

    return (
        <div
        className={
            classNames(
                className,
                vertical ? "btn-group-vertical" : "btn-group",
                size && `btn-group-${size}`
            )
        } {...otherProps}>
            {children}
        </div>
    );
}

ButtonGroup.propTypes = {
    size: PropTypes.oneOf(["sm", "lg"]),
    vertical: PropTypes.bool
};

ButtonGroup.defaultProps = {
    vertical: false
};