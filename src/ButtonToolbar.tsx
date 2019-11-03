import * as React from "react";
import classNames from "classnames";

export default function ButtonToolbar(props: React.HTMLAttributes<HTMLDivElement>) {
    const {
        className,
        children,
        ...otherProps
    } = props;

    return (
        <div className={classNames(
            className,
            "btn-toolbar"
        )} {...otherProps}>{children}</div>
    );
}