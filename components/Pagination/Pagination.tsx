import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"

interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "lg" | "sm"
    alignment?: "start" | "center" | "end"
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
    return (
        <nav {...restProps}>
            <ul className={
                classNames(
                    "pagination",
                    size && `pagination-${size}`,
                    alignment && `justify-content-${alignment}`
                )
            }>
                {children}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    size: PropTypes.oneOf(["sm", "lg"]),
    alignment: PropTypes.oneOf(["start", "center", "end"])
}