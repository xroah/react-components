import * as React from "react";
import { createPortal } from "react-dom";
import {
    classNames,
    ElementRect,
    OverlayContext,
    getElementRect,
    handleFuncProp,
    reflow,
    emulateTransitionEnd,
    throttle,
    getWindowSize
} from "./utils";

function getElementBox(el: HTMLElement) {
    const style = getComputedStyle(el);

    return {
        height: el.scrollHeight,
        width: el.scrollWidth,
        borderLeft: parseFloat(style.getPropertyValue("border-left-width")),
        borderTop: parseFloat(style.getPropertyValue("border-top-width")),
        borderBottom: parseFloat(style.getPropertyValue("border-bottom-width")),
        borderRight: parseFloat(style.getPropertyValue("border-right-width")),
        marginLeft: parseFloat(style.getPropertyValue("margin-left")),
        marginTop: parseFloat(style.getPropertyValue("margin-top")),
        marginBottom: parseFloat(style.getPropertyValue("margin-bottom")),
        marginRight: parseFloat(style.getPropertyValue("margin-right"))
    };
}

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
    fade?: boolean;
    unmountOnclose?: boolean;
    onKeydown?: (evt: KeyboardEvent, arg: any) => any;
}

interface OverlayState {
    visible: boolean;
    from?: string;
    rect?: ElementRect
}

export default class Overlay extends React.Component<OverlayProps, OverlayState> {

    private mountNode: HTMLElement | null = null;
    private hasEvent: boolean = false;
    private cancelTransition: Function | null = null;
    private srcEl: HTMLElement | null = null;

    constructor(props: OverlayProps) {
        super(props);

        this.state = {
            visible: !!props.visible,
            from: "state"
        };

        this.handleResize = throttle(this.handleResize.bind(this));
    }

    componentDidUpdate() {
        const {
            state: {
                visible
            },
            props: {
                fade
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
                    child.style.display = "block";
                    child.classList.remove("show");
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

    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        let { visible } = this.state;
        let src = evt.currentTarget;
        let rect: ElementRect | undefined = undefined;
        visible = !visible;
        this.srcEl = src;

        if (visible) {
            rect = getElementRect(src);
        }

        this.setState({
            visible,
            rect
        });
    };

    handlePosition() {
        const {
            mountNode,
            props: {
                position,
                flip
            },
            state: { rect }
        } = this;
        let left = 0;
        let top = 0;

        if (!mountNode || !mountNode.children.length || !rect) return { left, top };

        const _el = mountNode.children[0] as HTMLElement;
        const box = getElementBox(_el);
        const width = box.width + box.borderLeft + box.borderRight;
        const height = box.height + box.borderTop + box.borderBottom;
        //box-shadow .2rem
        const offset = parseInt(getComputedStyle(document.documentElement).fontSize) * 0.2;
        const leftOffset = box.marginLeft - box.marginRight;
        const topOffset = box.marginBottom - box.marginTop;
        const {
            width: windowWidth,
            height: windowHeight
        } = getWindowSize();
        const rightFn = () => {
            left = rect.left + rect.width + offset + leftOffset;
            top = rect.top + topOffset;
        };
        const topFn = () => {
            left = rect.left + leftOffset;
            top = rect.top - height - offset + topOffset;
        };
        const leftFn = () => {
            left = rect.left - width - offset + leftOffset;
            top = rect.top + topOffset;
        };
        const bottomFn = () => {
            left = rect.left + leftOffset;
            top = rect.top + rect.height + offset + topOffset;
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

        return {
            left,
            top,
            width,
            height
        };
        // const rect = getElementRect(src);
    }

    handleAlignment(el: HTMLElement, left: number, width: number) {
        const {
            props: {
                align,
                position = ""
            },
            state: {
                rect
            }
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

        return left;
    };

    setPosition() {
        const {
            mountNode
        } = this;

        if (!mountNode) return;

        const child = mountNode.children[0] as HTMLElement;

        if (!child) return;

        let { left, top, width = 0 } = this.handlePosition();
        left = this.handleAlignment(child, left, width);
        child.style.left = `${left}px`;
        child.style.top = `${top}px`;
    }

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

    handleResize() {
        this.setState({
            rect: getElementRect(this.srcEl as HTMLElement)
        });
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
                visible
            },
            props: {
                mountTo = document.body,
                popup,
                fade
            },
            mountNode
        } = this;
        let style: React.CSSProperties = {
            position: "absolute"
        };
        let _popup = popup as React.ReactElement;
        let className = fade ? "fade" : "";

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
                                <div style={style} className={className}>{popup}</div>
                            ) :
                            React.cloneElement(
                                _popup.props.children,
                                {
                                    style,
                                    className
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