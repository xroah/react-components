import * as React from "react"
import warning from "warning"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"

interface ListGroupProps extends
    React.OlHTMLAttributes<HTMLOListElement | HTMLUListElement> {
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
    ...restProps
}: ListGroupProps) {
    const PREFIX = "list-group"
    const prefix = (s: string) => `${PREFIX}-${s}`
    const classes = classNames(
        PREFIX,
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