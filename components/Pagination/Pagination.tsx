import React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {
    Alignment,
    alignments,
    Size,
    sizes
} from "../Commons/consts-and-types"

interface PaginationProps extends React.HTMLAttributes<HTMLUListElement> {
    size?: Size
    alignment?: Alignment
}

export default function Pagination(
    {
        size,
        alignment,
        className,
        children,
        ...restProps
    }: PaginationProps
) {
    const classes = classNames(
        "pagination",
        size && `pagination-${size}`,
        alignment && `justify-content-${alignment}`
    )

    return (
        <ul className={classes} {...restProps}>
            {children}
        </ul>
    )
}

Pagination.propTypes = {
    size: PropTypes.oneOf(sizes),
    alignment: PropTypes.oneOf(alignments)
}