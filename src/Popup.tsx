import * as React from "react";
import { createPortal } from "react-dom";
import {
    ElementRect,
    OverlayContext,
    handleFuncProp,
    emulateTransitionEnd,
    throttle,
    getWindowSize,
    reflow,
    classNames
} from "./utils";

export type position = "top" | "right" | "bottom" | "left";

export interface PopupCommonProps extends React.HTMLAttributes<HTMLElement> {
    placement?: position;
    flip?: boolean;
    fade?: boolean;
    offset?: number;
}

export interface PopupProps extends PopupCommonProps {
    align?: string;
    mountTo?: HTMLElement;
    visible?: boolean;
    unmountOnclose?: boolean;
    rect?: ElementRect;
    clearMargin?: boolean;
    verticalCenter?: boolean;
    alignmentPrefix?: string;
    escClose?: boolean;
    onClickOutside?: Function;
    onKeydown?: (evt: KeyboardEvent, arg: any) => any;
    onResetPosition?: Function;
    onFlip?: Function;
}

export default class Popup extends React.Component<PopupProps> {

    private mountNode: HTMLElement | null = null;
    private hasEvent: boolean = false;
    private cancelTransition: Function | null = null;

    static contextType = OverlayContext;
    static defaultProps = {
        flip: true,
        fade: true
    };

    constructor(props: PopupProps) {
        super(props);
        
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
                    }
                    //dropdown menu, tooltip need show class
                    child.classList.add("show");
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
                    this.unmount();
                });
            } else {
                child.style.display = "none";
                this.unmount();
            }
        }

        this.removeEvent();
    }

    componentWillUnmount() {
        const {
            props: {
                mountTo = document.body
            },
            mountNode
        } = this;

        mountNode && mountTo.removeChild(mountNode);

        this.mountNode = null;
    }

    unmount() {
        const {
            props: {
                unmountOnclose,
                mountTo = document.body
            },
            mountNode
        } = this;

        if (unmountOnclose && mountNode) {
            mountTo.removeChild(mountNode);
            this.mountNode = null;
        }
    };

    handleClickOutSide = (evt: MouseEvent) => {
        const t = evt.target as HTMLElement;

        if (this.mountNode && !this.mountNode.contains(t)) {
            handleFuncProp(this.props.onClickOutside)(t);
        }
    };

    handleKeydown = (evt: KeyboardEvent) => {
        const key = evt.key;
        const {
            props: {
                onKeydown,
                visible,
                escClose
            },
            mountNode
        } = this;

        if (visible) {
            key === "Escape" && escClose && this.close();
            handleFuncProp(onKeydown)(evt, mountNode);
        }
    }

    handlePosition() {
        const {
            mountNode,
            props: {
                placement,
                flip,
                rect,
                offset = 0,
                verticalCenter
            },
        } = this;
        let left = 0;
        let top = 0;
        let _placement = placement;

        if (!mountNode || !mountNode.children.length || !rect) return { left, top };

        const _el = mountNode.children[0] as HTMLElement;
        const width = _el.offsetWidth;
        const height = _el.offsetHeight;
        const {
            width: windowWidth,
            height: windowHeight
        } = getWindowSize();
        const rightFn = () => {
            left = rect.left + rect.width + offset;
            top = rect.top;
            _placement = "right";
        };
        const topFn = () => {
            left = rect.left;
            top = rect.top - height - offset;
            _placement = "top";
        };
        const leftFn = () => {
            left = rect.left - width - offset;
            top = rect.top;
            _placement = "left";
        };
        const bottomFn = () => {
            left = rect.left;
            top = rect.top + rect.height + offset;
            _placement = "bottom";
        };

        switch (placement) {
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

        if (
            verticalCenter &&
            (placement === "left" || placement === "right")
        ) {
            top += (rect.height - height) / 2;
        }

        return {
            left,
            top,
            placement: _placement
        };
    }

    handleAlignment(left: number, width: number, windowWidth: number) {
        const {
            props: {
                align,
                placement = "",
                rect
            },
        } = this;
        const posMap: any = {
            "top": true,
            "bottom": true
        };

        if (!rect || !(placement in posMap)) return left;

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
            mountNode,
            props: {
                alignmentPrefix,
                placement
            }
        } = this;

        if (!mountNode) return;

        const child = mountNode.children[0] as HTMLElement;

        if (!child) return;

        let { left, top, placement: p } = this.handlePosition();
        child.style.left = `${left}px`;
        child.style.top = `${top}px`;

        if (alignmentPrefix) {
            const cls1 = `${alignmentPrefix}-${placement}`;
            const cls2 = `${alignmentPrefix}-${p}`;

            child.classList.remove(cls1, cls2);
            console.log(cls1, cls2)
            if (placement !== p) {
                child.classList.add(cls2);
            } else {
                child.classList.add(cls1);
            }
        }
    }


    close = () => {
        if (this.context.close) {
            this.context.close();
        }
    };

    handleMouseEvent = (evt: React.MouseEvent<HTMLElement>) => {
        const { onMouseLeave, onMouseEnter } = this.props;

        evt.type === "mouseenter" ? handleFuncProp(onMouseEnter)(evt)
            : handleFuncProp(onMouseLeave)(evt);
    }

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
                className: popupClassName
            },
            mountNode
        } = this;
        let style: React.CSSProperties = {
            position: "absolute",
        };
        let popup = children as React.ReactElement;
        const className = classNames(fade ? "fade" : "");
        const classes = classNames(
            popupClassName,
            popup.props.className
        );

        if (typeof children === "function") {
            popup = children();
        }

        if ((!visible && !mountNode) || !popup) return null;

        if (!mountNode) {
            mountNode = this.mountNode = document.createElement("div");
            mountNode.style.cssText = `
                position: absolute; 
                left: 0;
                top: 0;
                width:100%;
                `
            mountTo.appendChild(mountNode);
        }

        const isFragment = (popup.type as string || "").toString().indexOf("react.fragment") > -1;
        const isMultiple = React.Children.count(children) > 1;
        let childStyle: React.CSSProperties = {
            ...popup.props.style,
        };
        const mouseEvent = {
            onMouseEnter: this.handleMouseEvent,
            onMouseLeave: this.handleMouseEvent
        };
        clearMargin && (childStyle.margin = 0)

        return createPortal(
            (
                (isFragment || isMultiple) ? (
                    <div
                        style={style}
                        className={className}
                        {...mouseEvent}>{
                            React.cloneElement(
                                popup,
                                {
                                    style: childStyle,
                                    className: classes
                                }
                            )
                        }</div>
                ) :
                    React.cloneElement(
                        popup,
                        {
                            style: {
                                ...childStyle,
                                ...style
                            },
                            className: classNames(className, classes),
                            ...mouseEvent
                        }
                    )
            ),
            mountNode
        )
    }
}