import * as React from "react";
import PropTypes from "prop-types";
import {
    createComponentByClass,
    OverlayContext,
    classNames,
    chainFunction
} from "../utils";
import Overlay, { CommonProps } from "./Overlay";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import DropdownButton from "./DropdownButton";
import Button from "./Button";
import { findDOMNode } from 'react-dom';

export interface DropdownProps extends CommonProps {
    alignment?: "left" | "center" | "right";
    overlay?: React.ReactElement;
}

interface DropdownState {
    visible: boolean;
    popupId: string;
}

const ID_PREFIX = "reap-ui-dropdown";
const VALID_SELECTOR = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)";
const keySet = new Set(
    [
        "arrowup",
        "arrowdown",
        "escape",
        "tab",
        "esc"
    ]
);
let uuid = 0;

export default class Dropdown extends React.Component<DropdownProps, DropdownState> {

    static propTypes = {
        alignment: PropTypes.oneOf(["left", "center", "right"]),
        overlay: PropTypes.element.isRequired
    };
    static defaultProps = {
        trigger: "click",
        placement: "bottom",
        alignment: "left"
    }
    static Menu = DropdownMenu;
    static Item = DropdownMenuItem;
    static Divider = createComponentByClass({
        className: "dropdown-divider",
        displayName: "DropdownDivider"
    });
    static Button = DropdownButton;
    static Context = OverlayContext;

    constructor(props: DropdownProps) {
        super(props);

        this.state = {
            visible: !!props.visible || !!props.defaultVisible,
            popupId: `${ID_PREFIX}-${uuid++}`
        };
    }

    static getDerivedStateFromProps(props: DropdownProps, state: DropdownProps) {
        if ("visible" in props) {
            return {
                visible: props.visible
            };
        }

        return state;
    }

    isControlled() {
        return "visible" in this.props;
    }

    setVisible(visible: boolean) {
        const callback = () => {
            const node = findDOMNode(this);
            let parent: HTMLElement | null;

            if (node && (parent = node.parentElement)) {
                visible ?
                    parent.classList.add("show") :
                    parent.classList.remove("show");
            }
        };

        this.setState({ visible }, callback);
    }

    escClose(key: string) {
        if (!this.state.visible) return;

        if (key === "escape" || key === "esc") {
            const node = findDOMNode(this) as HTMLElement;

            if (node && node.firstChild) {
                (node.firstChild as HTMLElement).focus();
            }
            this.setVisible(false);
        }
    }

    handleClick = (evt: React.MouseEvent) => {
        this.setVisible(!this.state.visible);
        evt.preventDefault();
        evt.stopPropagation();
    }

    handleKeyDown = (evt: React.KeyboardEvent) => {
        const key = evt.key.toLowerCase();
        const target = evt.target as HTMLButtonElement;
        const { visible, popupId } = this.state;
        const tag = target.tagName.toLowerCase();
        const isInput = /input|textarea/.test(tag);

        if (
            this.isControlled() ||
            !keySet.has(key) ||
            (!visible && key === "tab") ||
            (isInput && (key === "arrowup" || key === "arrowdown")) ||
            target.disabled ||
            target.classList.contains("disabled")
        ) return;

        evt.preventDefault();
        evt.stopPropagation();

        if (key === "arrowup" || key === "arrowdown" || key === "tab") {
            const popupElement = document.getElementById(popupId);

            if (!visible && key !== "tab") {
                return this.setVisible(true);
            }

            if (popupElement) {
                const item = popupElement.querySelector(VALID_SELECTOR) as HTMLElement;

                item && item.focus();
            }
        }

        this.escClose(key);
    }

    handlePopupKeydown = (evt: React.KeyboardEvent) => {
        const key = evt.key.toLowerCase();

        if (!keySet.has(key)) return;

        evt.preventDefault();
        evt.stopPropagation();

        const parent = evt.currentTarget as HTMLElement;
        const target = evt.target as HTMLElement;
        const allItems = parent.querySelectorAll(VALID_SELECTOR);
        const len = allItems.length;
        let index = 0;
        let el: HTMLElement | null = null;

        Array.from(allItems).forEach((node, i) => {
            if (node === target) {
                index = i;
            }
        });

        if (key === "arrowup" && index > 0) {
            index--;
        } else if ((key === "arrowdown" || key === "tab") && index < len - 1) {
            index++;
        } 

        el = allItems[index] as HTMLElement;
        
        el.focus();
        this.escClose(key);
    }

    handleClickOutside = () => {
        this.setVisible(false);
    }

    render() {
        const {
            children,
            overlay,
            placement,
            className,
            ...otherProps
        } = this.props;
        const {
            visible,
            popupId
        } = this.state;

        if (!overlay) return children;

        const positionMap: any = {
            left: "dropleft",
            top: "dropup",
            right: "dropright"
        };
        const position = positionMap[placement as string];
        const classes = classNames(className, "dropdown-toggle");
        let child = React.Children.only(children) as React.ReactElement<React.HTMLAttributes<HTMLElement>>;

        const {
            onClick,
            onKeyDown
        } = child.props;
        child = (
            <Button.Group className={position}>
                {
                    React.cloneElement<any>(
                        child,
                        {
                            className: classes,
                            onKeyDown: chainFunction(this.handleKeyDown, onKeyDown),
                            onClick: chainFunction(this.handleClick, onClick)
                        }
                    )
                }
            </Button.Group>
        );

        return (
            <Overlay
                popup={overlay}
                visible={visible}
                placement={placement}
                onClickOutside={this.handleClickOutside}
                popupProps={{
                    className: position,
                    onKeyDown: this.handlePopupKeydown,
                    id: popupId
                }}
                {...otherProps}>
                {child}
            </Overlay>
        );
    }

}