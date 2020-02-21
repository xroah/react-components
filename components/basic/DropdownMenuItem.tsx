import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    OverlayContext,
    handleFuncProp
} from "../utils";

export interface ItemProps extends React.HTMLAttributes<HTMLElement> {
    tag?: string;
    disabled?: boolean;
    active?: boolean;
    href?: string;
}

export default class DropdownMenuItem extends React.Component<ItemProps> {

    static contextType = OverlayContext;
    static defaultProps = {
        tag: "a"
    };
    static propTypes = {
        tag: PropTypes.string,
        disabled: PropTypes.bool,
        active: PropTypes.bool,
        href: PropTypes.string
    };

    handleClick = (evt: React.MouseEvent) => {
        const {onClick, disabled} = this.props;

        if (disabled) return;

        if (this.context.close) {
            this.context.close();
        }

        handleFuncProp(onClick)(evt);
    };

    render() {
        const {
            tag,
            className,
            disabled,
            active,
            ...otherProps
        } = this.props;

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
                onClick: this.handleClick,
                ...otherProps
            }
        );
    }

}