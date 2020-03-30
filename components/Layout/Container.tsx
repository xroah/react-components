import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import { CommonProps } from "../CommonPropsInterface";

export interface ContainerProps extends CommonProps<HTMLElement> {
    variant?: "fluid" | "sm" | "md" | "lg" | "xl";
}

export default function Container(props: ContainerProps) {
    const {
        className,
        variant,
        ...otherProps
    } = props;
    const PREFIX = "container";

    return (
        <div className={
            classNames(
                className,
                variant ? `${PREFIX}-${variant}` : PREFIX
            )
        } {...otherProps} />
    );
}

Container.propTypes = {
    variant: PropTypes.oneOf([
        "fluid",
        "sm", 
        "md",
        "lg",
        "md"
    ])
};