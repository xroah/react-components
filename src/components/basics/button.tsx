import React, { FunctionComponent } from "react"
import { ButtonProps } from "../commons/types"
import { classnames } from "../utils"

const Button: FunctionComponent<ButtonProps> = (
    {
        disabled,
        className,
        size,
        variant = "primary",
        type = "button",
        ...restProps
    }
) => {
    const classes = classnames(
        "btn",
        `btn-${variant}`,
        size && `btn-${size}`
    )

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            {...restProps} />
    )
}

export default Button