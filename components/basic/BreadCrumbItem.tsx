import * as React from "react";
import PropTypes from "prop-types";
import {classNames} from "../utils";

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
    active?: boolean;
    href?: string;
}

function BreadcrumbItem(props: BreadcrumbItemProps) {
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

BreadcrumbItem.propTypes = {
    active: PropTypes.bool,
    href: PropTypes.string
};
BreadcrumbItem.defaultProps = {
    active: false
};

export default BreadcrumbItem;