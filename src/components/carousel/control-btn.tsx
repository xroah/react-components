import React, { ButtonHTMLAttributes } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "prev" | "next"
    prefix: string
}

export default function ControlBtn(
    {
        variant,
        prefix,
        type = "button",
        ...restProps
    }: Props
) {
    return (
        <button
            type={type}
            className={`${prefix}-control-${variant}`}
            {...restProps}>
            <span className={`${prefix}-control-${variant}-icon`} />
        </button >
    )
}