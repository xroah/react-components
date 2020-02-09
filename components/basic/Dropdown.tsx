import * as React from "react";
import PropTypes from "prop-types";
import {
    createComponentByClass,
    OverlayContext,
    classNames
} from "../utils";
import Overlay, { CommonProps } from "./Overlay";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import DropdownButton from "./DropdownButton";

export interface DropdownProps extends CommonProps {
    alignment?: "left" | "center" | "right";
    overlay?: React.ReactNode;
}

export default class Dropdown extends React.Component<DropdownProps> {

    static defaultProps = {
        trigger: ["click"],
        placement: "bottom",
        alignment: "left",
        //offset: box-shadow .2rem
        offset: parseFloat(getComputedStyle(document.documentElement).fontSize || "16") * 0.2
    }
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
            offset,
            ...otherProps
        } = this.props;
        const positionMap: any = {
            left: "dropleft",
            top: "dropup",
            right: "dropright"
        };
        let wrapper: React.ReactElement | undefined = undefined;
        let position = positionMap[placement as string];
        const child = React.Children.only(children) as React.ReactElement;
        
        if (position) {
            wrapper = (
                <div className={classNames(position, "btn-group")}></div>
            );
        }

        return (
            <Overlay
                popup={overlay}
                placement={placement}
                wrapper={wrapper}
                onKeydown={this.handleKeydown}
                escClose={true}
                clickOutsideClose={true}
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