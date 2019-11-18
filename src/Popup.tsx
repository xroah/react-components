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

interface PopupState {
    pos?: position;
    status?: "stable" | "measure"
}

export interface PopupProps extends PopupCommonProps {
    align?: string;
    mountTo?: HTMLElement;
    visible?: boolean;
    unmountOnclose?: boolean;
    rect?: ElementRect;
    verticalCenter?: boolean;
    alignmentPrefix?: string;
    escClose?: boolean;
    onClickOutside?: Function;
    onKeydown?: (evt: KeyboardEvent, arg: any) => any;
    onResetPosition?: Function;
    onFlip?: Function;
}

export default class Popup extends React.Component<PopupProps, PopupState> {

    private mountNode: HTMLElement | null = null;
    private hasEvent: boolean = false;
    private cancelTransition: Function | null = null;
    private ref = React.createRef<HTMLDivElement>();

    static contextType = OverlayContext;
    static defaultProps = {
        flip: true,
        fade: true
    };

    constructor(props: PopupProps) {
        super(props);

        this.handleResize = throttle(this.handleResize.bind(this));
    }

    getClassNames() {
        const {
            props: {
                alignmentPrefix,
                placement,
                className
            },
            state: { pos }
        } = this;

        return classNames(
            className,
            alignmentPrefix && `${alignmentPrefix}-${pos || placement}`,
        );
    }

    updateNextTick(status?: "stable" | "measure", pos?: position) {
        requestAnimationFrame(() => {
            this.setState({
                status,
                pos
            });
        });
    };

    componentDidUpdate() {
        const {
            props: {
                fade,
                visible
            },
            hasEvent,
            mountNode,
            ref: {
                current: child
            },
            state: { status }
        } = this;

        if (!mountNode || !child) return;

        if (visible) {
            if (this.cancelTransition) {
                this.cancelTransition();
                this.cancelTransition = null;
            }

            if (!hasEvent) {
                child.style.display = "block";

                if (fade) {
                    reflow(child);
                    child.classList.add("show");
                }

                this.addEvent();
            }

            //just reset the position if already visible
            const placement = this.setPosition();

            if (status !== "stable") {
                this.updateNextTick("stable", placement);
            }

            return;
        }

        if (fade) {
            child.classList.remove("show");
            this.cancelTransition = emulateTransitionEnd(child, () => {
                this.cancelTransition = null;
                this.hide(child);
            });
        } else {
            this.hide(child);
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
        this.removeEvent();
    }

    hide(child: HTMLElement) {
        child.style.display = "none";
        this.setState({
            status: undefined,
            pos: undefined
        });
        this.unmount();
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
            ref: { current: child }
        } = this;
        let left = 0;
        let top = 0;
        let _placement = placement;

        if (!mountNode || !child || !rect) return { left, top };

        const width = child.offsetWidth;
        const height = child.offsetHeight;
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
            ref: { current: child }
        } = this;

        if (!mountNode || !child) return;

        let { left, top, placement } = this.handlePosition();
        child.style.left = `${left}px`;
        child.style.top = `${top}px`;

        return placement;
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
        this.updateNextTick("measure");
    }

    addEvent() {
        this.hasEvent = true;
        document.addEventListener("click", this.handleClickOutSide);
        document.addEventListener("keydown", this.handleKeydown);
        this.props.flip && window.addEventListener("resize", this.handleResize);
        window.addEventListener("scroll", this.handleResize);
    };

    removeEvent() {
        if (!this.hasEvent) return;
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
                className: popupClassName
            },
            mountNode
        } = this;
        let style: React.CSSProperties = {
            position: "absolute",
        };
        let popup = children as React.ReactElement;
        const className = classNames(fade ? "fade" : "");

        if (typeof children === "function") {
            popup = children();
        }

        if ((!visible && !mountNode) || !popup) return null;

        const childClassNames = classNames(
            popupClassName,
            popup.props.className,
            this.getClassNames(),
        );

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

        let childStyle: React.CSSProperties = {
            ...popup.props.style,
            position: "relative"
        };
        const mouseEvent = {
            onMouseEnter: this.handleMouseEvent,
            onMouseLeave: this.handleMouseEvent
        };

        return createPortal(
            <div
                style={style}
                className={className}
                ref={this.ref}
                {...mouseEvent}>{
                    React.cloneElement(
                        popup,
                        {
                            style: childStyle,
                            className: childClassNames
                        }
                    )
                }</div>,
            mountNode
        )
    }
}