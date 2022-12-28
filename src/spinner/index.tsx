import React, { CSSProperties, FunctionComponent } from "react"
import { DivProps, OneOf, Variant } from "../commons/types";
import { spinnerAnimations } from "../commons/constants";
import classNames from "classnames";

const sizes = ["sm"] as const

interface SpinnerProps extends DivProps {
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
    const classes = classNames(
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

export default Spinner