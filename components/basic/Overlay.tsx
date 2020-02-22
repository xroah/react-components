import * as React from "react";
import {
    OverlayContext,
    chainFunction,
    handleFuncProp
} from "../utils";
import Popup, { PopupCommonProps, PopupProps } from "./Popup";
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

export interface OverlayProps extends CommonProps, PopupProps {
    popup: React.ReactNode;
    popupProps?: React.HTMLAttributes<HTMLElement>;
}

interface OverlayState {
    visible: boolean;
    node: HTMLElement | null;
}

const actionType = ["hover", "click", "focus"];

export default class Overlay extends React.Component<OverlayProps, OverlayState> {

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
        ])
    };

    constructor(props: OverlayProps) {
        super(props);

        this.state = {
            visible: !!props.visible || !!props.defaultVisible,
            node: null
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

        //disabled or controlled
        if (
            src.disabled ||
            src.classList.contains("disabled")
        ) return;

        this.clearTimer();
        this.clearDelayTimer();
        evt.preventDefault();
        evt.stopPropagation();

        switch (type) {
            case "click":
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

    setVisible = (visible: boolean) => {
        this.setState({
            visible
        });
    }

    open = () => {
        if (this.state.visible) return;

        const open = () => this.setVisible(true);
        const { show = 0 } = this.handleDelay();

        if (show > 0) {
            this.delayTimer = setTimeout(open, show);
        } else {
            open();
        }

    };

    close = () => {
        if (!this.state.visible) return;

        const close = () => this.setVisible(false);
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
            ...otherProps
        } = this.props;
        let eventHandlers: any = {};

        delete otherProps.popup;
        delete otherProps.popupProps;
        delete otherProps.placement;
        delete otherProps.alignment;
        delete otherProps.offset;
        delete otherProps.onClickOutside;
        delete otherProps.fade;
        delete otherProps.flip;
        delete otherProps.unmountOnclose;
        delete otherProps.verticalCenter;
        delete otherProps.trigger;
        delete otherProps.visible;
        delete otherProps.defaultVisible;
        delete otherProps.delay;
        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHide;
        delete otherProps.onHidden;

        if (!this.isControlled()) {
            const handler = this.handleEvent;
            const {
                onClick,
                onMouseEnter,
                onMouseLeave,
                onBlur,
                onFocus
            } = (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props;
            const actionMap: any = {
                hover: {
                    onMouseEnter: chainFunction(handler, otherProps.onMouseEnter || onMouseEnter),
                    onMouseLeave: chainFunction(handler, otherProps.onMouseLeave || onMouseLeave)
                },
                click: {
                    onClick: chainFunction(handler, otherProps.onClick || onClick)
                },
                focus: {
                    onFocus: chainFunction(handler, otherProps.onFocus || onFocus),
                    onBlur: chainFunction(handler, otherProps.onBlur || onBlur)
                }
            };
            const action = this.getAction();

            action.forEach((a: string) => {
                if (a in actionMap) {
                    eventHandlers = {
                        ...eventHandlers,
                        ...actionMap[a]
                    };
                }
            });
        }

        //The event handlers of child will be overrode
        return React.cloneElement<any>(
            children as React.ReactElement,
            {
                ...otherProps,
                ...eventHandlers
            }
        );
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
                verticalCenter,
                onClickOutside
            },
            state: {
                visible,
                node
            }
        } = this;

        if (popup == undefined) return children;

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
            onClickOutside,
            ...popupProps
        };

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
                    onMouseEnter={this.handlePopupMouseEnter}
                    onMouseLeave={this.handlePopupMouseLeave}
                    node={node}
                    {...props}>
                    {popup}
                </Popup>
            </OverlayContext.Provider>
        );
    }

}