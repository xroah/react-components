import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "./utils";

export interface MenuProps extends React.HTMLAttributes<HTMLElement> {
    header?: React.ReactNode;
}

export default function DropdownMenu(props: MenuProps) {
    const {
        header,
        className,
        children,
        ...otherProps
    } = props;

    return (
        <div className={
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