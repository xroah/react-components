import * as React from "react"
import warning from "warning"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {getPrefixFunc} from "@commons/utils"

interface ListGroupProps extends React.OlHTMLAttributes<HTMLElement> {
    flush?: boolean
    numbered?: boolean
    horizontal?: boolean
    tag?: React.ElementType
}

export default function ListGroup({
    flush,
    numbered,
    horizontal,
    tag,
    className,
    ...restProps
}: ListGroupProps) {
    const prefix = getPrefixFunc("list-group")
    const classes = classNames(
        className,
        prefix(),
        flush && prefix("flush"),
        numbered && prefix("numbered"),
        horizontal && prefix("horizontal")
    )

    if (tag === undefined) {
        if (numbered) {
            tag = "ol"
        } else {
            tag = "ul"
        }
    } else {
        warning(
            !(tag !== "ol" && numbered),
            `The tag should be 'ol' if the list group is numbered,
            received '${tag}'`
        )
    }

    return React.createElement(
        tag,
        {
            className: classes,
            ...restProps
        }
    )
}

ListGroup.propTypes = {
    flush: PropTypes.bool,
    numbered: PropTypes.bool,
    horizontal: PropTypes.bool,
    tag: PropTypes.elementType
}