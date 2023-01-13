import React, { CSSProperties, FunctionComponent } from "react"
import { DivProps, OneOf, Variant } from "../commons/types";
import { spinnerAnimations, variants } from "../commons/constants";
import {
    number,
    oneOf,
    oneOfType,
    string
} from "prop-types";
import { classnames } from "../commons/utils";

export interface SpinnerProps extends DivProps {
    animation?: OneOf<typeof spinnerAnimations>
    variant?: Variant
    size?: number | string
}

const Spinner: FunctionComponent<SpinnerProps> = ({
    animation = "border",
    variant,
    size,
    className,
    style,
    ...restProps
}) => {
    const PREFIX = "spinner"
    const animationClass = `${PREFIX}-${animation}`
    const classes = classnames(
        className,
        animationClass,
        size === "sm" && `${animationClass}-sm`,
        variant && `text-${variant}`
    )
    const sizeStyle: CSSProperties = {}

    if (size !== "sm") {
        let sizeStr = ""

        if (typeof size === "string") {
            sizeStr = size
        } else {
            sizeStr = `${size}px`
        }

        sizeStyle.width = sizeStyle.height = sizeStr
    }

    return (
        <div
            className={classes}
            style={{ ...style, ...sizeStyle }}
            {...restProps} />
    )
}

Spinner.propTypes = {
    animation: oneOf(spinnerAnimations),
    variant: oneOf(variants),
    size: oneOfType([number, string])
}

export default Spinner