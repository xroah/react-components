import * as React from "react";
import PropTypes from "prop-types";
import {
    createComponentByClass,
    OverlayContext,
    classNames
} from "./utils";
import Overlay, { action, position } from "./Overlay";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import DropdownButton from "./DropdownButton";



export interface DropdownProps extends React.HTMLAttributes<HTMLElement> {
    placement?: position;
    align?: "left" | "center" | "right";
    overlay?: React.ReactNode;
    trigger?: action[] | action;
    flip?: boolean;
    fade?: boolean;
}

export default class Dropdown extends React.Component<DropdownProps> {

    static defaultProps = {
        trigger: ["click"],
        placement: "bottom",
        align: "left",
        flip: true,
        fade: true
    }
    static propTypes = {
        flip: PropTypes.bool,
        placement: PropTypes.oneOf([
            "top",
            "left",
            "bottom",
            "right"
        ])
    };
    static Menu = DropdownMenu;
    static MenuItem = DropdownMenuItem;
    static DropdownContext = OverlayContext;
    static Divider = createComponentByClass({
        className: "dropdown-divider",
        displayName: "DropdownDivider"
    });
    static Button = DropdownButton;

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
            placement,
            ...otherProps
        } = this.props;
        const positionMap: any = {
            left: "dropleft",
            top: "dropup",
            right: "dropright"
        };
        let wrapper: string | undefined = undefined;
        let position = positionMap[placement as string];
        let wrapperProps: React.HTMLAttributes<HTMLElement> = {};
        //box-shadow .2rem
        const offset = parseInt(getComputedStyle(document.documentElement).fontSize) * 0.2;
        const child = React.Children.only(children) as React.ReactElement;
        
        if (position) {
            wrapper = "div";
            wrapperProps.className = classNames(position, "btn-group");
        }

        return (
            <Overlay
                popup={overlay}
                position={placement}
                wrapper={wrapper}
                wrapperProps={wrapperProps}
                onKeydown={this.handleKeydown}
                offset={offset}
                {...otherProps}>
                {React.cloneElement(
                    child,
                    {
                        className: classNames(
                            "dropdown-toggle",
                            child.props.className
                        )
                    }
                )}
            </Overlay>
        );
    }

}