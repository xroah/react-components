import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {Variant} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {variantPropType} from "@commons/prop-types"

interface ListGroupItemProps extends React.AllHTMLAttributes<HTMLElement> {
    active?: boolean
    disabled?: boolean
    variant?: Variant
    actionable?: boolean
    tag?: React.ElementType
}

export default function ListGroupItem({
    active,
    disabled,
    variant,
    actionable,
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
        actionable && prefix("action")
    )

    if (tag === undefined) {
        if ("href" in restProps) {
            tag = "a"
        } else {
            tag = "li"
        }
    }

    return React.createElement(
        tag,
        {
            className: classes,
            ...restProps
        }
    )
}

ListGroupItem.propTypes = {
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    variant: variantPropType,
    action: PropTypes.bool,
    tag: PropTypes.elementType,
}