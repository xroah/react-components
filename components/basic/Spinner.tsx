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
    size?: "sm" | number;
    borderWidth?: number;
}

export default function Spinner(props: SpinnerProps) {
    const {
        variant,
        size,
        animation,
        className,
        children,
        style = {},
        borderWidth,
        ...otherProps
    } = props;
    const _className = `spinner-${animation}`;

    if (typeof size === "number") {
        style.width = style.height = size;
    }

    if (animation === "border" && borderWidth != undefined) {
        style.borderWidth = borderWidth;
    }

    return (
        <div
            className={
                classNames(
                    className,
                    _className,
                    size === "sm" && `${_className}-${size}`,
                    variant && `text-${variant}`
                )
            }
            style={style}
            {...otherProps}>
            {children}
        </div>
    );
}

Spinner.propTypes = {
    size: PropTypes.oneOfType([
        PropTypes.oneOf(["sm"]),
        PropTypes.number
    ]),
    animation: PropTypes.oneOf(["border", "grow"]).isRequired,
    variant: PropTypes.oneOf(variantArray)
};