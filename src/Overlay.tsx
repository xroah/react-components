import * as React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import {
    classNames,
    ElementRect,
    OverlayContext,
    getElementRect,
    handleFuncProp
} from "./utils";

export interface OverlayProps extends React.HTMLAttributes<HTMLElement> {
    position?: string;
    align?: string;
    mountTo?: HTMLElement;
    visible?: boolean;
    popup: React.ReactNode;
    flip?: boolean;
    trigger?: string[];
    wrapper?: string;
    wrapperProps?: React.HTMLAttributes<HTMLElement>
    onKeydown?: (evt: KeyboardEvent, arg: any) => any;
}

interface OverlayState {
    visible: boolean;
    from?: string;
    left: number;
    top: number;
}

export default class Overlay extends React.Component<OverlayProps, OverlayState> {

    private mountNode: HTMLElement | null = null;
    hasEvent: boolean = false;

    constructor(props: OverlayProps) {
        super(props);

        this.state = {
            visible: !!props.visible,
            left: 0,
            top: 0,
            from: "state"
        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        const {
            state: {
                visible
            },
            hasEvent
        } = this;

        if (visible) {
            !hasEvent && this.addEvent();
            return;
        }

        this.removeEvent();
    }

    handleClickOutSide = (evt: MouseEvent) => {
        if (!this.mountNode) return;

        if (!this.mountNode.contains(evt.target as HTMLElement)) {
            this.close();
        }
    };

    handleKeydown = (evt: KeyboardEvent) => {
        const key = evt.key.toLowerCase();
        const {
            state: { visible },
            props: { onKeydown },
            mountNode
        } = this;

        if (visible) {
            key === "escape" && this.close();
            handleFuncProp(onKeydown)(evt, mountNode);
        }


    }

    addEvent() {
        this.hasEvent = true;
        document.addEventListener("click", this.handleClickOutSide);
        document.addEventListener("keydown", this.handleKeydown);
    };

    removeEvent() {
        this.hasEvent = false;
        document.removeEventListener("click", this.handleClickOutSide);
        document.removeEventListener("keydown", this.handleKeydown);
    }

    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        const { visible } = this.state;
        const src = evt.currentTarget;

        this.setState(
            {
                visible: !visible
            },
            () => {
                if (this.state.visible) {
                    this.handlePosition(src)
                }
            }
        );
    };

    /* _setState(arg: any, callback?: () => void) {
        this.setState({
            ...arg,
            from: "state"
        }, callback);
    } */

    /* static getDerivedStateFromProps(prop: OverlayProps, state: OverlayState) {
        if (state.from) {
            return {
                ...state,
                from: ""
            };
        }
        if (prop.visible !== state.visible) {
            return {
                visible: prop.visible
            };
        }
        return null;
    } */

    open = () => {
        const { visible } = this.state;

        if (!visible) {
            this.setState({
                visible: true
            });
        }
    };

    close = () => {
        const { visible } = this.state;

        if (visible) {
            this.setState({
                visible: false
            });
        }
    };

    handlePosition(el: HTMLElement) {
        const {
            mountNode,
            props: {
                position,
                align,
                flip
            }
        } = this;
        let left = 0;
        let top = 0;

        if (!mountNode || !mountNode.children.length) return;

        const _el = mountNode.children[0];
        const width = _el.scrollWidth;
        const height = _el.scrollHeight;
        const rect = getElementRect(el);
        //box-shadow .2rem
        const offset = parseInt(getComputedStyle(document.documentElement).fontSize) * 0.2;

        switch (position) {
            case "top":
                left = rect.left;
                top = rect.top - height - offset;
                break;
            case "right":
                left = rect.left + rect.width + offset;
                top = rect.top;
                break;
            case "left":
                left = rect.left - width - offset;
                top = rect.top;
                break;
            default:
                left = rect.left;
                top = rect.top + rect.height + offset;
        }

        this.setState({
            left,
            top
        });
        // const rect = getElementRect(src);
    }

    renderChildren() {
        const {
            children,
            className,
            wrapper,
            wrapperProps
        } = this.props as any;
        // const child = React.Children.only(children) as React.ReactElement;

        if (!children) return null;

        const el = React.cloneElement(
            children,
            {
                className: classNames(children.props.className, className),
                onClick: this.handleClick
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

    renderPortal() {
        let {
            state: {
                visible,
                left,
                top
            },
            props: {
                mountTo = document.body,
                popup
            },
            mountNode
        } = this;
        let style: React.CSSProperties = {
            position: "absolute",
            display: visible ? "block" : "none",
            left,
            top
        };
        let _popup = popup as React.ReactElement;

        if (typeof popup === "function") {
            _popup = popup();
        }

        if ((!visible && !mountNode) || !_popup || !_popup.props.children) return null;

        let isFragment = typeof popup === "object" &&
            _popup.type.toString().indexOf("react.fragment") > -1 &&
            (popup as any).props.children.length > 1;

        if (!mountNode) {
            mountNode = this.mountNode = document.createElement("div");
            mountNode.style.cssText = "position: absolute; left: 0; top: 0;";
            mountTo.appendChild(mountNode);
        }

        return createPortal(
            (
                <OverlayContext.Provider value={{ close: this.close }}>
                    {
                        isFragment ?
                            (
                                <div style={style}>{popup}</div>
                            ) :
                            React.cloneElement(
                                _popup.props.children,
                                {
                                    style
                                }
                            )
                    }
                </OverlayContext.Provider>
            ),
            mountNode
        )
    }

    render() {
        return (
            <>
                {this.renderChildren()}
                {this.renderPortal()}
            </>
        );
    }

}