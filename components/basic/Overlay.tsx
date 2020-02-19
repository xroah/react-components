import * as React from "react";
import {
    OverlayContext,
    handleFuncProp,
    chainFunction
} from "../utils";
import Popup, { PopupCommonProps } from "./Popup";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { ModalContext } from "../contexts";

export type action = "hover" | "click" | "contextmenu" | "focus";

interface DelayObject {
    show?: number;
    hide?: number;
}

export interface CommonProps extends PopupCommonProps {
    trigger?: action[] | action;
    delay?: number | DelayObject;
}

export interface OverlayProps extends CommonProps {
    alignment?: string;
    mountTo?: HTMLElement;
    popup: React.ReactNode;
    popupProps?: React.HTMLAttributes<HTMLElement>;
    wrapper?: React.ReactElement;
    unmountOnclose?: boolean;
    verticalCenter?: boolean;
    escClose?: boolean;
    clickOutsideClose?: boolean;
    onKeydown?: (evt: KeyboardEvent, arg: any) => any;
}

interface OverlayState {
    visible: boolean;
    node?: HTMLElement;
}

const actionType = ["hover", "contextmenu", "click", "focus"];

export default class Overlay extends React.Component<OverlayProps, OverlayState> {

    private srcEl: HTMLElement | null = null;
    private timer: NodeJS.Timeout | null = null;
    private delayTimer: NodeJS.Timeout | null = null;

    static propTypes = {
        trigger: PropTypes.oneOfType([
            PropTypes.oneOf(actionType),
            PropTypes.arrayOf(PropTypes.oneOf(actionType))
        ]),
        delay: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({
                show: PropTypes.number,
                hide: PropTypes.number
            })
        ]),
        onVisibleChange: PropTypes.func
    };

    constructor(props: OverlayProps) {
        super(props);

        this.state = {
            visible: !!props.visible || !!props.defaultVisible
        };
    }

    static getDerivedStateFromProps(props: OverlayProps, state: OverlayState) {
        if ("visible" in props) {
            return {
                visible: props.visible,
                node: state.node
            };
        }

        return state;
    }

    componentDidMount() {
        const node = findDOMNode(this) as HTMLElement;

        this.setState({
            node
        });
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

    isControlled() {
        return "visible" in this.props;
    }

    handleEvent = (evt: React.MouseEvent<HTMLElement & HTMLButtonElement>) => {
        const src = evt.currentTarget;
        const type = evt.type;
        this.srcEl = src;

        //disabled or controlled
        if (
            src.disabled ||
            src.classList.contains("disabled") ||
            this.isControlled()
        ) return;

        this.clearTimer();
        this.clearDelayTimer();
        evt.preventDefault();
        evt.stopPropagation();

        switch (type) {
            case "click":
            case "contextmenu":
                this.toggle();
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

    handleClickOutside = (target: HTMLElement) => {
        const action = this.getAction();
        const set = new Set<any>(action);

        if (
            !this.isControlled() &&
            (set.has("click") || set.has("contextmenu")) &&
            this.srcEl !== target
        ) {
            this.props.clickOutsideClose && this.close();
        }
    };

    handleKeydown = (evt: KeyboardEvent, el: HTMLElement) => {
        const key = evt.key;
        const { onKeydown, escClose } = this.props;

        if (escClose && key === "Escape" && !this.isControlled()) {
            this.close();
        }

        handleFuncProp(onKeydown)(evt, el);
    };

    handleDelay() {
        const { delay } = this.props;
        let ret: DelayObject = {
            show: 0,
            hide: 0
        };

        if (delay) {
            if (typeof delay === "number") {
                ret.show = ret.hide = delay;
            } else {
                ret = delay;
            }
        }

        return ret;
    }

    clearDelayTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    }

    changeVisible = (visible: boolean) => {
        this.setState({
            visible
        });
    }

    open = () => {
        const { visible } = this.state;
        const open = () => this.changeVisible(true);

        if (visible) return;

        const { show = 0 } = this.handleDelay();

        if (show > 0) {
            this.delayTimer = setTimeout(open, show);
        } else {
            open();
        }

    };

    close = () => {
        const { visible } = this.state;
        this.srcEl = null;
        const close = () => this.changeVisible(false);

        if (!visible) return;

        const { hide = 0 } = this.handleDelay();

        if (hide > 0) {
            this.delayTimer = setTimeout(close, hide);
        } else {
            close();
        }
    };

    toggle = () => {
        const { visible } = this.state;

        visible ? this.close() : this.open();
    };

    //for hover, prevent the popup from hiding when mouseout fires
    delayClose() {
        const { hide = 0 } = this.handleDelay();

        if (this.timer != null) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.timer = setTimeout(this.close, hide > 100 ? 0 : 150);
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
        delete otherProps.flip;
        delete otherProps.unmountOnclose;
        delete otherProps.verticalCenter;
        delete otherProps.trigger;
        delete otherProps.defaultVisible;
        delete otherProps.delay;
        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHide;
        delete otherProps.onHidden;
        delete otherProps.visible;

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
                children,
                popup,
                popupProps,
                placement,
                alignment,
                offset,
                fade,
                onShow,
                onShown,
                onHidden,
                onHide,
                unmountOnclose,
                verticalCenter
            },
            state: {
                visible,
                node
            }
        } = this;
        const props = {
            fade,
            offset,
            placement,
            alignment,
            unmountOnclose,
            verticalCenter,
            onShow,
            onShown,
            onHide,
            onHidden,
            ...popupProps
        };

        if (!popup) return children;

        return (
            <OverlayContext.Provider value={{ close: this.close }}>
                {this.renderChildren()}
                <ModalContext.Consumer>
                    {
                        ({ isModal, visible: mVisible }) => {
                            if (visible && isModal && !mVisible) {
                                this.close();
                            }

                            return null;
                        }
                    }
                </ModalContext.Consumer>
                <Popup
                    visible={visible}
                    onKeydown={this.handleKeydown}
                    onMouseEnter={this.handlePopupMouseEnter}
                    onMouseLeave={this.handlePopupMouseLeave}
                    onClickOutside={this.handleClickOutside}
                    node={node}
                    {...props}>
                    {popup}
                </Popup>
            </OverlayContext.Provider>
        );
    }

}