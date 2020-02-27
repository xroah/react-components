import * as React from "react";
import BreadcrumbItem from "./BreadCrumbItem";
import { CommonProps } from "../CommonPropsInterface";

function Breadcrumb(props: CommonProps<HTMLElement>) {
    const { className, children, ...otherProps } = props;

    return (
        <nav className={className} {...otherProps}>
            <ol className="breadcrumb">
                {children}
            </ol>
        </nav>
    );
}

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;