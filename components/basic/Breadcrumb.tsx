import * as React from "react";
import BreadcrumbItem from "./BreadCrumbItem";

function Breadcrumb(props: React.HTMLAttributes<HTMLElement>) {
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