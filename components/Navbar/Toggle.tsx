import * as React from "react"
import {classNames} from "../utils"
import {ButtonCommonProps} from "../Common/CommonPropsInterface"

export default function NavbarToggle(props: ButtonCommonProps<HTMLButtonElement>) {
    const {
        className,
        type = "button",
        children,
        ...otherProps
    } = props

    return (
        <button
            type={type}
            className={
                classNames(
                    className,
                    "navbar-toggler"
                )
            } {...otherProps}>
            <span className="navbar-toggler-icon" />
            {children}
        </button>
    )
}