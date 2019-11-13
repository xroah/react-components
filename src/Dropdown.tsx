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
        flip: true
    }
    static propTypes = {
        flip: PropTypes.bool
    };
    static Menu = DropdownMenu;
    static MenuItem = DropdownMenuItem;
    static DropdownContext = OverlayContext;

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
                {...otherProps}>
                {children}
            </Overlay>
        );
    }

}