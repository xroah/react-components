import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    handleFuncProp
} from "../../utils";
import { DropdownContext } from "../../contexts";
import { CommonProps } from "../../CommonPropsInterface";

export interface ItemProps extends CommonProps<HTMLElement> {
    tag?: React.ElementType;
    disabled?: boolean;
    active?: boolean;
    href?: string;
}

export default function DropdownMenuItem(props: ItemProps) {
    const {
        tag,
        className,
        disabled,
        active,
        onClick,
        ...otherProps
    } = props;
    const context = React.useContext(DropdownContext);
    const handleClick = (evt: React.MouseEvent) => {
        const target = evt.target as HTMLElement;

        if (!/input|textarea/i.test(target.tagName) && !disabled) {
            context.close();
        }
        
        handleFuncProp(onClick)(evt);
    };

    if (tag !== "a") {
        delete otherProps.href;
    }

    return React.createElement(
        tag as string,
        {
            className: classNames(
                className,
                "dropdown-item",
                active && "active",
                disabled && "disabled"
            ),
            onClick: handleClick,
            ...otherProps
        }
    );
}

DropdownMenuItem.defaultProps = {
    tag: "a"
};
DropdownMenuItem.propTypes = {
    tag: PropTypes.elementType,
    disabled: PropTypes.bool,
    active: PropTypes.bool,
    href: PropTypes.string
};