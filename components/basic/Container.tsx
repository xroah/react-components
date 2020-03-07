import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import { CommonProps } from "../CommonPropsInterface";

export interface ContainerProps extends CommonProps<HTMLElement> {
    fluid?: boolean;
    minWidth?: "sm" | "md" | "lg" | "md";
}

export default function Container(props: ContainerProps) {
    const {
        className,
        fluid,
        minWidth,
        ...otherProps
    } = props;
    const PREFIX = "container";

    return (
        <div className={
            classNames(
                className,
                PREFIX,
                fluid ? `${PREFIX}-fluid` : minWidth ? `${PREFIX}-${minWidth}` : ""
            )
        } {...otherProps} />
    );
}

Container.propTypes = {
    fluid: PropTypes.bool,
    minWidth: PropTypes.oneOf([
        "sm", 
        "md",
        "lg",
        "md"
    ])
};