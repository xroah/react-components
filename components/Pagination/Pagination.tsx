import React from "react"
import classNames from "reap-utils/lib/class-names"
import {Size} from "../Commons/consts-and-types"
import {sizePropType} from "../Commons/prop-types"

type BaseProps = Omit<React.HTMLAttributes<HTMLUListElement>, "size">

export interface PaginationProps extends BaseProps {
    size?: Size
}

export default function Pagination(
    {
        size,
        className,
        children,
        ...restProps
    }: PaginationProps
) {
    const classes = classNames(
        className,
        "pagination",
        size && `pagination-${size}`
    )

    return (
        <ul className={classes} {...restProps}>
            {children}
        </ul>
    )
}

Pagination.propTypes = {
    size: sizePropType
}