import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"

type BaseProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

export interface BreadcrumbItemProps extends BaseProps {
    active?: boolean
}

function BreadcrumbItem(
    {
        className,
        children,
        href,
        active
    }: BreadcrumbItemProps
) {
    return (
        <li
            className={classNames(
                className,
                "breadcrumb-item",
                active && "active"
            )}>
            <a href={href}>{children}</a>
        </li>
    )
}

BreadcrumbItem.propTypes = {
    active: PropTypes.bool,
    href: PropTypes.string
}
BreadcrumbItem.defaultProps = {
    active: false
}

export default BreadcrumbItem