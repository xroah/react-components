import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    variantArray,
    variantType
} from "../utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
    variant?: variantType;
    animation: "border" | "grow";
    size?: "sm";
}

export default function Spinner(props: SpinnerProps) {
    const {
        variant,
        size,
        animation,
        className,
        children,
        ...otherProps
    } = props;
    const _className = `spinner-${animation}`;

    return (
        <div className={
            classNames(
                className,
                _className,
                size && `${_className}-${size}`,
                variant && `text-${variant}`
            )
        } {...otherProps}>
            {children}
        </div>
    );
}

Spinner.propTypes = {
    size: PropTypes.oneOf(["sm"]),
    animation: PropTypes.oneOf(["border", "grow"]).isRequired,
    variant: PropTypes.oneOf(variantArray)
};