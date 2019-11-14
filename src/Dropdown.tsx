import * as React from "react";
import PropTypes from "prop-types";
import {
    createComponentByClass,
    OverlayContext,
    classNames
} from "./utils";
import Overlay from "./Overlay";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";

type action = "hover" | "click" | "contextmenu" | "focus";

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    position?: "top" | "right" | "bottom" | "left";
    align?: "left" | "center" | "right";
    overlay?: React.ReactNode;
    trigger?: action[];
    flip?: boolean;
    fade?: boolean;
}

export default class Dropdown extends React.Component<DropdownProps> {

    static Divider = createComponentByClass({
        className: "dropdown-divider",
        displayName: "DropdownDivider"
    });
    static defaultProps = {
        trigger: ["click"],
        position: "bottom",
        align: "left",
        flip: true,
        fade: true
    }
    static propTypes = {
        flip: PropTypes.bool
    };
    static Menu = DropdownMenu;
    static MenuItem = DropdownMenuItem;
    static DropdownContext = OverlayContext;

    handleKeydown = (evt: KeyboardEvent, el: HTMLElement) => {
        if (!el) return;

        const key = evt.key;
        const focused = el.querySelector(".dropdown-item:focus");
        const allItems = el.querySelectorAll(".dropdown-item:not(.disabled)");
        let index = 0;
        let keyMap: any = {
            "ArrowUp": -1,
            "ArrowDown": 1
        };

        if (key in keyMap) {
            Array.from(allItems).forEach((e, i) => {
                if (e === focused) {
                    index = i + keyMap[key];
                }
            });

            const _el = allItems[index] as HTMLElement;
            
            _el && _el.focus && _el.focus();
            evt.preventDefault();
        }
    };

    render() {
        const {
            children,
            overlay,
            position,
            ...otherProps
        } = this.props;
        const positionMap: any = {
            left: "dropleft",
            top: "dropup",
            right: "dropright"
        };
        let wrapper: string | undefined = undefined;
        let _position = positionMap[position as string];
        let wrapperProps: React.HTMLAttributes<HTMLElement> = {};

        if (_position) {
            wrapper = "div";
            wrapperProps.className = classNames(_position, "btn-group");
        }

        return (
            <Overlay
                popup={overlay}
                position={position}
                wrapper={wrapper}
                wrapperProps={wrapperProps}
                onKeydown={this.handleKeydown}
                {...otherProps}>
                {children}
            </Overlay>
        );
    }

}