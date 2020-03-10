import * as React from "react";
import { CommonProps } from "../../CommonPropsInterface";

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

export default Breadcrumb;