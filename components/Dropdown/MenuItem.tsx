import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {DropdownContext} from "../Common/contexts"
import {CommonProps} from "../Common/CommonPropsInterface"
import omitProps from "../utils/omitProps"

export interface ItemProps extends CommonProps<HTMLElement> {
    tag?: React.ElementType
    disabled?: boolean
    active?: boolean
    href?: string
}

export default function DropdownMenuItem(props: ItemProps) {
    const {
        tag,
        className,
        disabled,
        active,
        onClick,
        ...otherProps
    } = props
    const context = React.useContext(DropdownContext)
    if (tag !== "a") {
        omitProps(otherProps, ["href"])
    }

    return React.createElement(
        tag as string,
        {
            className: classNames(
                className,
                "dropdown-item",
                active && "active",
                disabled && "disabled"
            ),
            onClick(evt: React.MouseEvent<HTMLElement, MouseEvent>) {
                const target = evt.target as HTMLElement

                if (!/input|textarea/i.test(target.tagName) && !disabled) {
                    context.close()
                }

                onClick && !disabled && onClick(evt)
            },
            ...otherProps
        }
    )
}

DropdownMenuItem.defaultProps = {
    tag: "a"
}
DropdownMenuItem.propTypes = {
    tag: PropTypes.elementType,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    href: PropTypes.string
}