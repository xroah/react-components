import * as React from "react"
import PropTypes from "prop-types"
import {createComponent} from "reap-utils/lib/react"

export interface BreadcrumbItemProps extends
    React.LiHTMLAttributes<HTMLLIElement> {
    active?: boolean
    href?: string
}

export default createComponent<BreadcrumbItemProps>({
    className: "breadcrumb-item",
    propTypes: {
        active: PropTypes.bool,
        href: PropTypes.string
    },
    propsHandler({
        active,
        ...restProps
    }) {
        return {
            className: active ? "active" : "",
            newProps: restProps
        }
    },
    render(
        className,
        {
            href,
            children,
            ...restProps
        }
    ) {
        return (
            <li className={className} {...restProps}>
                <a href={href}>{children}</a>
            </li>
        )
    }
})