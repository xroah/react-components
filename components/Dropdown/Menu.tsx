import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"
import {CommonProps} from "../Common/CommonPropsInterface"

export interface MenuProps extends CommonProps<HTMLDivElement> {
    header?: string | React.ReactNode
}

export default function DropdownMenu(props: MenuProps) {
    const {
        header,
        className,
        children,
        style = {
        },
        ...otherProps
    } = props
    style.left = 0
    style.top = 0
    style.position = "relative"
    style.outline = style.outline || "none"

    return (
        <div
            tabIndex={-1}
            style={style}
            className={
                classNames(
                    className,
                    "dropdown-menu show"
                )
            }
            {...otherProps}>
            {
                !isUndef(header) && <div className="dropdown-header">{header}</div>
            }
            {children}
        </div>
    )
}

DropdownMenu.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}