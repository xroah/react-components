import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {AnchorCommonProps} from "../Common/CommonPropsInterface"

export interface BreadcrumbItemProps extends AnchorCommonProps<HTMLAnchorElement> {
    active?: boolean
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
    const {
        className,
        children,
        active,
        ...otherProps
    } = props

    return (
        <li className={
            classNames(
                className,
                "breadcrumb-item",
                active && "active"
            )
        }>
            <a {...otherProps}>{children}</a>
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