import * as React from "react";
import { chainFunction } from "../utils";
import Popup, { PopupCommonProps, PopupProps } from "./Popup";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { ModalContext } from "./contexts";
import omitProps from "../utils/omitProps";

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

export function handleDelay(delay?: number | DelayObject) {
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

        //disabled
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
        if (this.state.visible || this.isControlled()) return;

        const open = () => this.setVisible(true);
        const { show = 0 } = handleDelay(this.props.delay);

        this.delayTimer = setTimeout(open, show);

    };

    close = () => {
        if (!this.state.visible || this.isControlled()) return;

        const close = () => this.setVisible(false);
        const { hide = 0 } = handleDelay(this.props.delay);

        this.delayTimer = setTimeout(close, hide);
    };

    toggle = () => {
        const { visible } = this.state;

        visible ? this.close() : this.open();
    };

    //for hover, prevent the popup from hiding when mouseout fires
    delayClose() {
        const { hide = 0 } = handleDelay(this.props.delay);

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

        omitProps(
            otherProps,
            [
                "popup",
                "popupProps",
                "placement",
                "alignment",
                "offset",
                "onClickOutside",
                "fade",
                "unmountOnExit",
                "verticalCenter",
                "trigger",
                "visible",
                "defaultVisible",
                "delay",
                "onShow",
                "onShown",
                "onHide",
                "onHidden",
                "popupMountNode"
            ]
        );

        //if controlled do not add these event handlers
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
                unmountOnExit,
                verticalCenter,
                onClickOutside,
                popupMountNode
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
            unmountOnExit,
            verticalCenter,
            onShow,
            onShown,
            onHide,
            onHidden,
            onClickOutside,
            popupMountNode,
            ...popupProps
        };

        return (
            <>
                {this.renderChildren()}
                <ModalContext.Consumer>
                    {
                        //when placed within modals, dismiss once modals are closed
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
                    target={node}
                    {...props}>
                    {popup}
                </Popup>
            </>
        );
    }

}