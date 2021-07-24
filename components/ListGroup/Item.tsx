import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {Variant, variants} from "../Commons/variants"
import {getPrefixFunc} from "../Commons/utils"

interface ListGroupItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    active?: boolean
    disabled?: boolean
    variant?: Variant
    action?: boolean
    tag?: React.ElementType
}

export default function ListGroupItem({
    active,
    disabled,
    variant,
    action,
    tag,
    className,
    ...restProps
}: ListGroupItemProps) {
    const prefix = getPrefixFunc("list-group-item")
    const classes = classNames(
        className,
        prefix(),
        active && "active",
        disabled && "disabled",
        variant && prefix(variant),
        action && prefix("action")
    )

    return React.createElement(
        tag!,
        {
            className: classes,
            ...restProps
        }
    )
}

ListGroupItem.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf(variants),
    action: PropTypes.bool,
    tag: PropTypes.elementType,
}
ListGroupItem.defaultProps = {
    tag: "li"
}