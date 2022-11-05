import React, { ButtonHTMLAttributes } from "react"

export default function CloseBtn(
    props: ButtonHTMLAttributes<HTMLButtonElement>
) {
    return <button className="btn-close" {...props} />
}