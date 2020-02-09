import * as React from "react";
import {
    ElementRect,
    getElementRect,
    OverlayContext,
    handleFuncProp
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

    static defaultProps = {
        clearPosition: true,
        clearMargin: true,
        offset: 0
    };
    static propTypes = {
        offset: PropTypes.number,
        placement: PropTypes.oneOf([
            "top",
            "left",
            "bottom",
            "right"
        ]),
        flip: PropTypes.bool,
        fade: PropTypes.bool
    };

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
        const eventMap: any = {
            click: "onClick",
            contextmenu: "onContextMenu",
            focus: "onFocus",
            blur: "onBlur",
            mouseenter: "onMouseEnter",
            mouseLeave: "onMouseLeave"
        };
        const handler = eventMap[type];
        this.srcEl = src;

        //disabled
        if (src.disabled || src.classList.contains("disabled")) return;

        if (handler in c.props) {
            (c.props as any)[handler](evt);
        }

        this.clearTimer();

        switch (type) {
            case "click":
            case "contextmenu":
                this.toggle();
                type === "contextmenu" && evt.preventDefault();
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
            wrapper
        } = this.props as any;
        const actionMap: any = {
            hover: {
                onMouseEnter: this.handleEvent,
                onMouseLeave: this.handleEvent
            },
            click: {
                onClick: this.handleEvent
            },
            contextmenu: {
                onContextMenu: this.handleEvent
            },
            focus: {
                onFocus: this.handleEvent,
                onBlur: this.handleEvent
            }
        };
        let eventHandlers: any = {};
        let action = this.getAction();

        action.forEach((a: string) => {
            if (a in actionMap) {
                eventHandlers = {
                    ...eventHandlers,
                    ...actionMap[a]
                };
            }
        });

        const el = React.cloneElement(
            children,
            {
                ...eventHandlers
            }
        );

        return wrapper ? React.cloneElement(wrapper, {}, el) : el;
    }

    render() {
        const {
            props: {
                popup,
                ...otherProps
            },
            state: {
                rect,
                visible
            }
        } = this;

        delete otherProps.onKeydown;

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
                        {...otherProps}>{popup}</Popup>
                </OverlayContext.Provider>
            </>
        );
    }

}