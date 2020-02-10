import * as React from "react";
import {
    ElementRect,
    getElementRect,
    OverlayContext,
    handleFuncProp,
    chainFunction
} from "../utils";
import Popup, { PopupCommonProps } from "./Popup";
import PropTypes from "prop-types";

export type action = "hover" | "click" | "contextmenu" | "focus";

export interface CommonProps extends PopupCommonProps {
    trigger?: action[] | action;
    onVisibleChange?: Function;
}

export interface OverlayProps extends CommonProps {
    alignment?: string;
    mountTo?: HTMLElement;
    visible?: boolean;
    popup: React.ReactNode;
    popupProps?: React.HTMLAttributes<HTMLElement>;
    wrapper?: React.ReactElement;
    unmountOnclose?: boolean;
    verticalCenter?: boolean;
    alignmentPrefix?: string;
    escClose?: boolean;
    clickOutsideClose?: boolean;
    onKeydown?: (evt: KeyboardEvent, arg: any) => any;
}

interface OverlayState {
    visible: boolean;
    rect?: ElementRect;
}

export default class Overlay extends React.Component<OverlayProps, OverlayState> {

    private srcEl: HTMLElement | null = null;
    private timer: NodeJS.Timeout | null = null;

    constructor(props: OverlayProps) {
        super(props);

        this.state = {
            visible: !!props.visible
        };
    }

    getAction() {
        const { trigger } = this.props;
        let action: Array<any> = [];

        if (Array.isArray(trigger)) {
            action = trigger;
        } else {
            action = [trigger];
        }

        return action;
    }

    handleEvent = (evt: React.MouseEvent<HTMLElement & HTMLButtonElement>) => {
        const src = evt.currentTarget;
        const c = this.props.children as React.ReactElement;
        const type = evt.type;
        this.srcEl = src;

        //disabled
        if (src.disabled || src.classList.contains("disabled")) return;

        this.clearTimer();

        switch (type) {
            case "click":
            case "contextmenu":
                this.toggle();
                evt.preventDefault();
                break;
            case "mouseenter":
            case "focus":
                this.open();
                break;
            case "mouseleave":
                this.delayClose();
                break;
            case "blur":
                this.close();
                break;
        }
    };

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    handlePopupMouseEnter = () => {
        this.clearTimer();
    }

    handlePopupMouseLeave = () => {
        const action = this.getAction();

        if (action.indexOf("hover") > -1) {
            this.delayClose();
        }
    }

    handleResetPosition = () => {
        const el = this.srcEl as HTMLElement;

        if (!el) return;

        this.setState({
            rect: getElementRect(el)
        });
    };

    handleClickOutside = (target: HTMLElement) => {
        const action = this.getAction();
        const set = new Set<any>(action);

        if (
            (set.has("click") ||
                set.has("contextmenu")) &&
            this.srcEl !== target
        ) {
            this.props.clickOutsideClose && this.close();
        }
    };

    handleKeydown = (evt: KeyboardEvent, el: HTMLElement) => {
        const key = evt.key;
        const { onKeydown, escClose } = this.props;

        if (escClose && key === "Escape") {
            this.close();
        }

        handleFuncProp(onKeydown)(evt, el);
    };

    open = () => {
        const {
            state: { visible },
            props: { onVisibleChange },
            srcEl
        } = this;

        if (!srcEl || visible) return;

        this.setState({
            visible: true,
            rect: getElementRect(srcEl)
        });

        handleFuncProp(onVisibleChange)(visible);
    };

    close = () => {
        const {
            state: { visible },
            props: { onVisibleChange }
        } = this;

        if (visible) {
            this.setState({
                visible: false
            });
            handleFuncProp(onVisibleChange)(visible);
        }

        this.srcEl = null;
    };

    toggle = () => {
        const { visible } = this.state;

        visible ? this.close() : this.open();
    };

    delayClose() {
        if (this.timer != null) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = setTimeout(this.close, 150);
    }

    renderChildren() {
        const {
            children,
            wrapper,
            ...otherProps
        } = this.props;
        const handler = this.handleEvent;
        const {
            onClick,
            onMouseEnter,
            onMouseLeave,
            onContextMenu,
            onBlur,
            onFocus
        } = (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props;
        const actionMap: any = {
            hover: {
                onMouseEnter: chainFunction(handler, otherProps.onMouseEnter, onMouseEnter),
                onMouseLeave: chainFunction(handler, otherProps.onMouseLeave, onMouseLeave)
            },
            click: {
                onClick: chainFunction(handler, otherProps.onClick, onClick)
            },
            contextmenu: {
                onContextMenu: chainFunction(handler, otherProps.onContextMenu, onContextMenu)
            },
            focus: {
                onFocus: chainFunction(handler, otherProps.onFocus, onFocus),
                onBlur: chainFunction(handler, otherProps.onBlur, onBlur)
            }
        };
        let eventHandlers: any = {};
        let action = this.getAction();

        delete otherProps.popup;
        delete otherProps.popupProps;
        delete otherProps.onKeydown;
        delete otherProps.placement;
        delete otherProps.alignment;
        delete otherProps.offset;
        delete otherProps.clickOutsideClose;
        delete otherProps.escClose;
        delete otherProps.fade;

        action.forEach((a: string) => {
            if (a in actionMap) {
                eventHandlers = {
                    ...eventHandlers,
                    ...actionMap[a]
                };
            }
        });

        const el = React.cloneElement(
            children as React.ReactElement,
            {
                ...otherProps,
                ...eventHandlers
            }
        );

        return wrapper ? React.cloneElement(wrapper, {}, el) : el;
    }

    render() {
        const {
            props: {
                popup,
                popupProps,
                placement,
                alignment,
                offset,
                fade
            },
            state: {
                rect,
                visible
            }
        } = this;
        const props = {
            fade,
            offset,
            placement,
            alignment,
            ...popupProps
        };

        return (
            <>
                {this.renderChildren()}
                <OverlayContext.Provider value={{ close: this.close }}>
                    <Popup
                        visible={visible}
                        rect={rect}
                        onKeydown={this.handleKeydown}
                        onResetPosition={this.handleResetPosition}
                        onMouseEnter={this.handlePopupMouseEnter}
                        onMouseLeave={this.handlePopupMouseLeave}
                        onClickOutside={this.handleClickOutside}
                        {...props}>
                        {popup}
                    </Popup>
                </OverlayContext.Provider>
            </>
        );
    }

}