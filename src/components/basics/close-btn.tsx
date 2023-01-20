import React, { ButtonHTMLAttributes } from "react"

export default function CloseBtn(
    {
        type = "button",
        ...restProps
    }: ButtonHTMLAttributes<HTMLButtonElement>
) {
    return (
        <button
            type={type}
            className="btn-close"
            {...restProps} />
    )
}