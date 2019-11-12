import * as React from "react";
import PropTypes from "prop-types";
import {
    createComponentByClass,
    OverlayContext
} from "./utils";
import Overlay from "./Overlay";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";

type action = "hover" | "click" | "contextmenu";

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    overlay?: React.ReactNode;
    trigger?: action[];
}

export default class Dropdown extends React.Component<DropdownProps> {

    static Divider = createComponentByClass({
        className: "dropdown-divider",
        displayName: "DropdownDivider"
    });
    static defaultProps = {
        trigger: ["hover"]
    };
    static Menu = DropdownMenu;
    static MenuItem = DropdownMenuItem;
    static DropdownContext = OverlayContext;


    render() {
        const {
            children,
            overlay,
            ...otherProps
        } = this.props;
        const child = React.Children.only(children);

        return (
            <Overlay popup={overlay} {...otherProps}>
                {child}
            </Overlay>
        );
    }

}