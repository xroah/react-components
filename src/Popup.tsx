import * as React from "react";
import { createPortal } from "react-dom";
import {
    ElementRect,
    OverlayContext,
    handleFuncProp,
    emulateTransitionEnd,
    throttle,
    getWindowSize,
    reflow
} from "./utils";

export interface PopupProps extends React.HTMLAttributes<HTMLElement> {
    position?: string;
    align?: string;
    mountTo?: HTMLElement;
    visible?: boolean;
    flip?: boolean;
    fade?: boolean;
    unmountOnclose?: boolean;
    rect?: ElementRect;
    clearPosition?: boolean;
    clearMargin?: boolean;
    onClickOutside?: Function;
    onKeydown?: (evt: KeyboardEvent, arg: any) => any;
    onResetPosition?: Function;
}


export default class Overlay extends React.Component<PopupProps> {

    private mountNode: HTMLElement | null = null;
    private hasEvent: boolean = false;
    private cancelTransition: Function | null = null;

    static contextType = OverlayContext;

    constructor(props: PopupProps) {
        super(props);

        this.state = {
            visible: !!props.visible,
            from: "state"
        };

        this.handleResize = throttle(this.handleResize.bind(this));
    }

    componentDidUpdate() {
        const {
            props: {
                fade,
                visible
            },
            hasEvent,
            mountNode
        } = this;

        if (!mountNode) return;

        const child = mountNode.children[0] as HTMLElement;

        if (visible) {
            if (this.cancelTransition) {
                this.cancelTransition();
                this.cancelTransition = null;
            }

            if (child) {
                if (!hasEvent) {
                    child.classList.remove("show");
                    child.style.display = "block";
                    this.setPosition();

                    if (fade) {
                        reflow(child);
                        child.classList.add("show");
                    }
                } else {
                    //just reset the position
                    this.setPosition();
                }
            }

            !hasEvent && this.addEvent();
            return;
        }

        if (child) {
            if (fade) {
                child.classList.remove("show");
                this.cancelTransition = emulateTransitionEnd(child, () => {
                    child.style.display = "none";
                    this.cancelTransition = null;
                });
            } else {
                child.style.display = "none";
            }
        }

        this.removeEvent();
    }

    handleClickOutSide = (evt: MouseEvent) => {
        const t = evt.target as HTMLElement;

        if (this.mountNode && !this.mountNode.contains(t)) {
            handleFuncProp(this.props.onClickOutside)(t);
        }
    };

    handleKeydown = (evt: KeyboardEvent) => {
        const key = evt.key.toLowerCase();
        const {
            props: {
                onKeydown,
                visible
            },
            mountNode
        } = this;

        if (visible) {
            key === "escape" && this.close();
            handleFuncProp(onKeydown)(evt, mountNode);
        }
    }

    handlePosition() {
        const {
            mountNode,
            props: {
                position,
                flip,
                rect
            },
        } = this;
        let left = 0;
        let top = 0;

        if (!mountNode || !mountNode.children.length || !rect) return { left, top };

        const _el = mountNode.children[0] as HTMLElement;
        const width = _el.clientWidth;
        const height = _el.scrollHeight;
        //box-shadow .2rem
        const offset = parseInt(getComputedStyle(document.documentElement).fontSize) * 0.2;
        const {
            width: windowWidth,
            height: windowHeight
        } = getWindowSize();
        const rightFn = () => {
            left = rect.left + rect.width + offset;
            top = rect.top;
        };
        const topFn = () => {
            left = rect.left;
            top = rect.top - height - offset;
        };
        const leftFn = () => {
            left = rect.left - width - offset;
            top = rect.top;
        };
        const bottomFn = () => {
            left = rect.left;
            top = rect.top + rect.height + offset;
        };

        switch (position) {
            case "top":
                topFn();

                if (flip && (rect.bottom - rect.height) < height) {
                    bottomFn();
                }
                break;
            case "right":
                rightFn();

                if (flip && (windowWidth - rect.right) < width) {
                    leftFn();
                }
                break;
            case "left":
                leftFn();

                if (flip && (rect.right - rect.width - width) < width) {
                    rightFn();
                }
                break;
            default:
                bottomFn();

                if (flip && (windowHeight - rect.bottom) < height) {
                    topFn();
                }
        }

        left = this.handleAlignment(left, width, windowWidth);

        return {
            left,
            top
        };
    }

    handleAlignment(left: number, width: number, windowWidth: number) {
        const {
            props: {
                align,
                position = "",
                rect
            },
        } = this;
        const posMap: any = {
            "top": true,
            "bottom": true
        };

        if (!rect || !(position in posMap)) return left;

        switch (align) {
            case "center":
                left += (rect.width - width) / 2;
                break;
            case "right":
                left += (rect.width - width);
                break;
            default:
        }

        if (left < 0) {
            left = 0;
        } else if (left + width >= windowWidth) {
            left = windowWidth - width;
        }

        return left;
    };

    setPosition() {
        const {
            mountNode
        } = this;

        if (!mountNode) return;

        const child = mountNode.children[0] as HTMLElement;

        if (!child) return;

        let { left, top } = this.handlePosition();
        child.style.left = `${left}px`;
        child.style.top = `${top}px`;
    }


    close = () => {
        if (this.context.close) {
            this.context.close();
        }
    };

    handleMouseEnter = (evt: React.MouseEvent<HTMLElement>) => {
        handleFuncProp(this.props.onMouseEnter)(evt);
    };

    handleMouseLeave = (evt: React.MouseEvent<HTMLElement>) => {
        handleFuncProp(this.props.onMouseLeave)(evt);
    };

    handleResize() {
        handleFuncProp(this.props.onResetPosition)();
    }

    addEvent() {
        this.hasEvent = true;
        document.addEventListener("click", this.handleClickOutSide);
        document.addEventListener("keydown", this.handleKeydown);
        this.props.flip && window.addEventListener("resize", this.handleResize);
        window.addEventListener("scroll", this.handleResize);
    };

    removeEvent() {
        this.hasEvent = false;
        document.removeEventListener("click", this.handleClickOutSide);
        document.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("scroll", this.handleResize);
    }

    render() {
        let {
            props: {
                mountTo = document.body,
                children,
                fade,
                visible,
                clearMargin,
                clearPosition
            },
            mountNode
        } = this;
        let style: React.CSSProperties = {
            position: "absolute"
        };
        let popup = children as React.ReactElement;
        let className = fade ? "fade" : "";

        if (typeof children === "function") {
            popup = children();
        }

        if ((!visible && !mountNode) || !popup) return null;

        if (!mountNode) {
            mountNode = this.mountNode = document.createElement("div");
            mountNode.style.cssText = "position: absolute; left: 0; top: 0;";
            mountTo.appendChild(mountNode);
        }

        let childStyle: React.CSSProperties = {
            ...popup.props.style,
        };
        clearPosition && (childStyle.position = "static");
        clearMargin && (childStyle.margin = 0)

        return createPortal(
            (
                <div
                    style={style}
                    className={className}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}>{
                        React.cloneElement(
                            popup,
                            {
                                style: childStyle
                            }
                        )
                    }</div>
            ),
            mountNode
        )
    }
}