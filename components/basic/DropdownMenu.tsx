import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import { CommonProps } from "../CommonPropsInterface";
import { DropdownContext } from "../contexts";

export interface MenuProps extends CommonProps<HTMLDivElement> {
    header?: React.ReactNode;
}

export default function DropdownMenu(props: MenuProps) {
    const {
        header,
        className,
        children,
        style = {},
        onClick,
        ...otherProps
    } = props;
    const context = React.useContext(DropdownContext);
    style.left = 0;
    style.top = 0;
    style.position = "relative";
    style.outline =  style.outline || "none";

    //for calculating size correctly
    if (context.isDropdown) {
        style.float = "none";
    }

    return (
        <div
            tabIndex={-1}
            style={style}
            className={
                classNames(
                    className,
                    "dropdown-menu show"
                )
            }
            {...otherProps}>
            {
                header != undefined && <div className="dropdown-header">{header}</div>
            }
            {children}
        </div>
    );
}

DropdownMenu.propTypes = {
    header: PropTypes.node
}