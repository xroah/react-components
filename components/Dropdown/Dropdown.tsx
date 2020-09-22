import * as React from "react"
import {classNames} from "../utils"
import Button from "../Button"
import DropdownInner, {DropdownProps} from "./DropdownInner"

export default function Dropdown(props: DropdownProps) {
    const {
        children,
        placement,
        className,
        style,
        ...otherProps
    } = props

    const positionMap: any = {
        left: "dropleft",
        top: "dropup",
        right: "dropright"
    }
    const position = positionMap[placement as string]
    const classes = classNames(className, position)

    return (
        <Button.Group className={classes} style={style}>
            <DropdownInner
                placement={placement}
                {...otherProps}>
                {children}
            </DropdownInner>
        </Button.Group>
    )
}

Dropdown.defaultProps = {
    placement: "bottom"
}