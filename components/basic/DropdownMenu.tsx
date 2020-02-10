import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
    header?: React.ReactNode;
}

export default function DropdownMenu(props: MenuProps) {
    const {
        header,
        className,
        children,
        style = {},
        ...otherProps
    } = props;
    style.left = 0;
    style.top = 0;
    style.position = "relative";

    return (
        <div
            style={style}
            className={
                classNames(
                    className,
                    "dropdown-menu show"
                )
            }
            {...otherProps}>
            {
                header && <div className="dropdown-header">{header}</div>
            }
            {children}
        </div>
    );
}

DropdownMenu.propTypes = {
    header: PropTypes.node
}