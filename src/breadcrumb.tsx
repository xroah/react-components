import * as React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
    listProps?: React.HTMLAttributes<HTMLOListElement>
}

function Breadcrumb(props: BreadcrumbProps) {
    const {className, listProps, children, ...otherProps} = props;
    const {className: listClassName, ...otherListProps} = listProps || {};

    return (
        <nav className={className} {...otherProps}>
            <ul className={
                classnames(
                    "breadcrumb",
                    listClassName
                )
            }
                {...otherListProps}>
                {children}
            </ul>
        </nav>
    );
}

Breadcrumb.defaultProps = {
    listProps: {}
};

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
    active?: boolean;
    href?: string;
}

function Item(props: BreadcrumbItemProps) {
    const {
        className,
        children,
        href,
        active
    } = props;

    return (
        <li
            className={classnames(
                className,
                "breadcrumb-item",
                active && "active"
            )}>
            <a href={href}>{children}</a>
        </li>
    );
}

Item.propTypes = {
    active: PropTypes.bool,
    href: PropTypes.string
};
Item.defaultProps = {
    active: false
};

Breadcrumb.Item = Item;

export default Breadcrumb;