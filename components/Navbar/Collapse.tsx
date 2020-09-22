import * as React from "react"
import {classNames} from "../utils"
import Collapse, {CollapseProps} from "../Collapse/Collapse"

export default function NavbarCollapse(props: CollapseProps) {
    const {
        className,
        ...otherProps
    } = props

    return (
        <Collapse className={
            classNames(
                className,
                "navbar-collapse"
            )
        } {...otherProps} />
    )
}