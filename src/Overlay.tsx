import * as React from "react";
import {
    classNames,
    ElementRect,
    getElementRect,
    OverlayContext
} from "./utils";
import Popup from "./Popup";

export type action = "hover" | "click" | "contextmenu" | "focus";
export type position = "top" | "right" | "bottom" | "left";

export interface OverlayProps extends React.HTMLAttributes<HTMLElement> {
    position?: position;
    align?: string;
    mountTo?: HTMLElement;
    visible?: boolean;
    popup: React.ReactNode;
    flip?: boolean;
    trigger?: action | action[];
    wrapper?: string;
    wrapperProps?: React.HTMLAttributes<HTMLElement>
    fade?: boolean;
    unmountOnclose?: boolean;
    clearPosition?: boolean;
    clearMargin?: boolean;
    offset?: number;
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

        switch (type) {
            case "click":
            case "contextmenu":
                this.toggle();
                type ==="contextmenu" && evt.preventDefault();
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

    handlePopupMouseEnter = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    handlePopupMouseLeave = () => {
        const action = this.getAction();

        if (action.indexOf("hover") > -1) {
            this.close();
        }
    }

    handleResetPosition = () => {
        this.setState({
            rect: getElementRect(this.srcEl as HTMLElement)
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
            this.close();
        }
    };

    open = () => {
        if (!this.srcEl || this.state.visible) return;

        this.setState({
            visible: true,
            rect: getElementRect(this.srcEl)
        });
    };

    close = () => {
        const { visible } = this.state;

        if (visible) {
            this.setState({
                visible: false
            });
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
            wrapperProps
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
            if (actionMap.hasOwnProperty(a)) {
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

        if (wrapper) {
            return React.createElement(
                wrapper,
                { ...wrapperProps },
                el
            )
        }

        return el;
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

        return (
            <>
                {this.renderChildren()}
                <OverlayContext.Provider value={{ close: this.close }}>
                    <Popup
                        visible={visible}
                        rect={rect}
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