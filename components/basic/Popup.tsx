import * as React from "react";
import { createPortal } from "react-dom";
import {
    ElementRect,
    handleFuncProp,
    throttle,
    classNames
} from "../utils";
import Fade from "../Fade";

export type position = "top" | "right" | "bottom" | "left";

export interface PopupCommonProps extends React.HTMLAttributes<HTMLElement> {
    placement?: position;
    flip?: boolean;
    fade?: boolean;
    offset?: number;
}

type status = "stable" | "measure" | "update";

interface PopupState {
    pos?: position;
    status?: status;
    placement?: position;
    left?: number;
    top?: number;
}

export interface PopupProps extends PopupCommonProps {
    align?: string;
    mountTo?: HTMLElement;
    visible?: boolean;
    unmountOnclose?: boolean;
    rect?: ElementRect;
    verticalCenter?: boolean;
    alignmentPrefix?: string;
    onClickOutside?: Function;
    onKeydown?: (evt: KeyboardEvent, arg: HTMLElement) => void;
    onResetPosition?: Function;
}

export default class Popup extends React.Component<PopupProps, PopupState> {

    private mountNode: HTMLElement | null = null;
    private hasEvent: boolean = false;
    private ref = React.createRef<HTMLDivElement>();

    static defaultProps = {
        flip: true,
        fade: true
    };

    constructor(props: PopupProps) {
        super(props);

        this.state = {};
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

    updateNextTick(status?: status, pos?: position) {
        if (!this.props.visible) return;

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
                visible,
                fade
            },
            hasEvent,
            state: {
                status,
                placement
            }
        } = this;

        if (visible) {
            if (!hasEvent) {
                this.addEvent();
            }

            if (status !== "stable") {//just reset the position if already visible
                if (
                    status === "measure" ||
                    // update when onEntering invoked if enable fade,
                    //in case update doubly
                     (!fade && !status) 
                    ) {
                    this.updatePosition();
                } else if (status === "update"){
                    this.updateNextTick("stable", placement);
                }

            }

            return;
        }

        //in case update visible prop(invoke hide) infinitely 
        if (hasEvent) {
            this.removeEvent();
        }
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
        const {
            props: {
                onKeydown
            },
            mountNode
        } = this;

        handleFuncProp(onKeydown)(evt, mountNode);
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
        const windowWidth = document.documentElement.clientWidth;
        //innerWidth/innerHeight contains width of scrollbar
        //usually webpage does not have horizontal scrollbar
        const windowHeight = window.innerHeight;
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
        const handleFlip = (needFlip: boolean, callback: Function) => {
            if (flip && needFlip) callback();
        }

        switch (placement) {
            case "top":
                topFn();
                handleFlip(rect.bottom - rect.height < height, bottomFn);
                break;
            case "right":
                rightFn();
                handleFlip(windowWidth - rect.right < width, leftFn);
                break;
            case "left":
                leftFn();
                handleFlip(rect.right - rect.width < width, rightFn);
                break;
            default:
                bottomFn();
                handleFlip(windowHeight - rect.bottom < height, topFn);
        }

        left = this.handleAlignment(left, width, windowWidth);

        if (
            verticalCenter &&
            (placement === "left" || placement === "right")
        ) top += (rect.height - height) / 2;

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

    updatePosition() {
        let { left, top, placement } = this.handlePosition();

        this.setState({
            left,
            top,
            placement,
            status: "update"
        });
    }

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
        if (this.hasEvent) return;

        const { flip } = this.props;
        this.hasEvent = true;
        document.addEventListener("click", this.handleClickOutSide);
        document.addEventListener("keydown", this.handleKeydown);
        if (flip) {
            window.addEventListener("resize", this.handleResize);
            window.addEventListener("scroll", this.handleResize);
        }
    };

    removeEvent() {
        if (!this.hasEvent) return;

        this.hasEvent = false;
        document.removeEventListener("click", this.handleClickOutSide);
        document.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("scroll", this.handleResize);
    }

    handleEntering = () => {
        //update position, in case calc indirectly when fade in
        this.setState({
            status: "measure"
        });
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
            state: {
                left,
                top
            },
            mountNode
        } = this;
        let style: React.CSSProperties = {
            position: "absolute",
            left,
            top
        };
        let popup = children as React.ReactElement;

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
                `;
            mountTo.appendChild(mountNode);
        }

        const childStyle: React.CSSProperties = {
            ...popup.props.style,
            position: "relative"
        };
        const mouseEvent = {
            onMouseEnter: this.handleMouseEvent,
            onMouseLeave: this.handleMouseEvent
        };
        const child = (
            <div
                style={style}
                ref={this.ref}
                {...mouseEvent}>
                {
                    React.cloneElement(
                        popup,
                        {
                            style: childStyle,
                            className: childClassNames
                        }
                    )
                }
            </div>
        );

        return createPortal(
            (
                fade ? (
                    <Fade
                        appear
                        toggleDisplay
                        onEntering={this.handleEntering}
                        in={!!visible}
                        timeout={150}>
                        {child}
                    </Fade>
                ) : React.cloneElement(
                    child,
                    {
                        style: {
                            ...style,
                            display: visible ? "block" : "none"
                        }
                    }
                )
            ),
            mountNode
        )
    }
}