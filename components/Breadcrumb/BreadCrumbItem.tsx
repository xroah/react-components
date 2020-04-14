import * as React from "react";
import PropTypes from "prop-types";
import {classNames} from "../utils";
import { AnchorCommonProps } from "../Common/CommonPropsInterface";

export interface BreadcrumbItemProps extends AnchorCommonProps<HTMLLIElement> {
    active?: boolean;
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