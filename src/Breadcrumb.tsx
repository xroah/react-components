import * as React from "react";
import PropTypes from "prop-types";
import {classNames} from "./utils";

function Breadcrumb(props: React.HTMLAttributes<HTMLElement>) {
    const {className, children, ...otherProps} = props;

    return (
        <nav className={className} {...otherProps}>
            <ul className="breadcrumb">
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
            className={classNames(
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