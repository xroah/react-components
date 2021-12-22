import * as React from "react"
import PropTypes from "prop-types"
import {createComponent} from "reap-utils/lib/react"
import {StatusProps} from "../Commons/consts-and-types"

type BaseProps = React.LiHTMLAttributes<HTMLLIElement> &
    Omit<StatusProps, "disabled">

interface BreadcrumbItemProps extends BaseProps {
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