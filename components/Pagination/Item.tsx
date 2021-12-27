import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import PropTypes from "prop-types"
import {AnchorAttrs, StatusProps} from "../Commons/consts-and-types"
import {createComponent} from "reap-utils/lib/react"

type PaginationItemProps = StatusProps & AnchorAttrs

export default createComponent<PaginationItemProps>({
    tag: "li",
    className: "page-item",
    propTypes: {
        active: PropTypes.bool,
        disabled: PropTypes.bool
    },
    defaultProps: {
        href: "#"
    },
    propsHandler({
        active,
        disabled,
        style,
        href,
        children,
        ...restProps
    }) {
        return {
            className: classNames(
                "page-item",
                active && "active",
                disabled && "disabled"
            ),
            newProps: restProps
        }
    },
    render(
        className,
        {
            style,
            href,
            children,
            ...restProps
        }
    ) {
        return (
            <li style={style} className={className}>
                <a
                    href={href}
                    className="page-link"
                    {...restProps}>
                    {children}
                </a>
            </li>
        )
    }
})