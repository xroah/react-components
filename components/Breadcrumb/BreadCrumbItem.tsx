import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"

type BaseProps = React.LiHTMLAttributes<HTMLLIElement>

export interface BreadcrumbItemProps extends BaseProps {
    active?: boolean
    href?: string
}

function BreadcrumbItem(
    {
        className,
        children,
        href,
        active,
        ...restProps
    }: BreadcrumbItemProps
) {
    const classes = classNames(
        className,
        "breadcrumb-item",
        active && "active"
    )

    return (
        <li className={classes} {...restProps}>
            <a href={href}>{children}</a>
        </li>
    )
}

BreadcrumbItem.propTypes = {
    active: PropTypes.bool,
    href: PropTypes.string
}

export default BreadcrumbItem