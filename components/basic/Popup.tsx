import * as React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import {
    handleFuncProp,
    throttle
} from "../utils";
import Fade from "../Fade";
import { PopupContext } from "../contexts";
import Align from "./Align";

export type position = "top" | "right" | "bottom" | "left";

export interface PopupCommonProps extends React.HTMLAttributes<HTMLElement> {
    placement?: position;
    visible?: boolean;
    flip?: boolean;
    offset?: number | number[];
    defaultVisible?: boolean;
    fade?: boolean;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
}

interface Position {
    left: number;
    top: number;
}

interface PopupState {
    arrowPos: Position
    placement?: position;
    left?: number;
    top?: number;
}

export interface PopupProps extends PopupCommonProps {
    alignment?: "left" | "center" | "right";
    //below props are internal temporarily
    mountTo?: HTMLElement;
    unmountOnclose?: boolean;
    node?: HTMLElement | null;
    verticalCenter?: boolean;
    onClickOutside?: Function;
}

export default class Popup extends React.Component<PopupProps, PopupState> {

    private mountNode: HTMLElement | null = null;
    private ref = React.createRef<HTMLDivElement>();
    private alignRef = React.createRef<Align>();

    static propTypes = {
        placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        flip: PropTypes.bool,
        fade: PropTypes.bool,
        offset: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.number)
        ]),
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func,
        alignment: PropTypes.oneOf(["left", "center", "right"])
    };
    static defaultProps = {
        flip: true,
        fade: true,
        offset: [0, 0],
        defaultVisible: false
    };

    constructor(props: PopupProps) {
        super(props);

        this.state = {
            arrowPos: {//for popup arrow(tooltip, popover)
                left: 0,
                top: 0
            }
        };
        this.handleResize = throttle(this.handleResize);
    }

    componentDidUpdate(prevProps: PopupProps) {
        const {
            props: {
                visible
            }
        } = this;

        if (prevProps.visible !== visible) {
            if (visible) {
                return this.addEvent();
            }

            this.removeEvent();
        }
    }

    removeNode() {
        const {
            props: {
                mountTo = document.body
            },
            mountNode
        } = this;

        mountNode && mountTo.removeChild(mountNode);

        this.mountNode = null;
    }

    componentWillUnmount() {
        this.removeNode();
        this.removeEvent();
    }

    handleClickOutSide = (evt: MouseEvent) => {
        const t = evt.target as HTMLElement;
        const { onClickOutside } = this.props;

        if (
            this.mountNode &&
            !this.mountNode.contains(t)
        ) {
            handleFuncProp(onClickOutside)();
        }
    };

    handleArrowPosition = () => {
        const {
            props: {
                placement,
                node,
            },
            ref: { current: child }
        } = this;

        if (!node || !child) return;

        const nRect = node.getBoundingClientRect();
        const cRect = child.getBoundingClientRect();
        const isArrowVertical = placement === "left" || placement === "right";
        const arrowPos: Position = {
            left: 0,
            top: 0
        };

        if (isArrowVertical) {
            arrowPos.top = nRect.top - cRect.top + nRect.height / 2;
        } else {
            arrowPos.left = nRect.left - cRect.left + nRect.width / 2;
        }

        this.setState({ arrowPos });
    }

    updatePosition = () => {
        let { left, top, placement } = (this.alignRef.current as any).update();


        this.setState(
            {
                left,
                top,
                placement
            },
            this.handleArrowPosition
        );
    }

    handleMouseEvent = (evt: React.MouseEvent<HTMLElement>) => {
        const { onMouseLeave, onMouseEnter } = this.props;

        evt.type === "mouseenter" ? handleFuncProp(onMouseEnter)(evt)
            : handleFuncProp(onMouseLeave)(evt);
    }

    handleResize = () => {
        requestAnimationFrame(this.updatePosition);
    }

    addEvent() {
        const { flip } = this.props;
        document.addEventListener("click", this.handleClickOutSide);
        window.addEventListener("resize", this.handleResize);
        flip && window.addEventListener("scroll", this.handleResize);
    };

    removeEvent() {
        document.removeEventListener("click", this.handleClickOutSide);
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("scroll", this.handleResize);
    }

    handleEnter = (node: HTMLElement) => {
        const { onShow } = this.props;

        handleFuncProp(onShow)(node);
    };

    handleEntered = (node: HTMLElement) => {
        const { onShown } = this.props;

        handleFuncProp(onShown)(node);
    };

    handleEntering = () => {
        //update position, in case calc incorrectly(invisible) when fade in
        this.updatePosition();
    }

    handleExit = (node: HTMLElement) => {
        const { onHide } = this.props;

        handleFuncProp(onHide)(node);
    };

    handleExited = (node: HTMLElement) => {
        const {
            onHidden,
            unmountOnclose
        } = this.props;

        unmountOnclose && this.removeNode();
        handleFuncProp(onHidden)(node);
    };

    render() {
        let {
            props: {
                mountTo = document.body,
                children,
                fade,
                visible,
                offset,
                placeholder,
                alignment,
                placement: propPlacement,
                unmountOnclose,
                node,
                verticalCenter,
                flip,
                ...otherProps
            },
            state: {
                left,
                top,
                arrowPos,
                placement
            },
            mountNode
        } = this;
        let style: React.CSSProperties = {
            position: "absolute",
            left: 0,
            top: 0,
            willChange: "transform",
            transform: `translate3d(${left}px, ${top}px, 0)`
        };
        let _children = children as React.ReactElement;

        /* if (typeof children === "function") {
            _children = children();
        } */

        if (
            (!visible && !mountNode) ||
            !_children ||
            !node
        ) return null;

        delete otherProps.onClickOutside;
        delete otherProps.defaultVisible;
        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHide;
        delete otherProps.onHidden;

        if (!mountNode) {
            mountNode = this.mountNode = document.createElement("div");
            mountNode.style.cssText = `
                position: absolute; 
                left: 0;
                top: 0;
                width:100%;
                z-index: 99999
                `;
            mountTo.appendChild(mountNode);
        }
        const mouseEvent = {
            onMouseEnter: this.handleMouseEvent,
            onMouseLeave: this.handleMouseEvent
        };
        const context: any = {
            arrowLeft: arrowPos.left,
            arrowTop: arrowPos.top,
            placement
        };
        const child = (
            <div
                ref={this.ref}
                {...{ ...mouseEvent, ...otherProps }}>
                <PopupContext.Provider value={context}>
                    {_children}
                </PopupContext.Provider>
            </div>
        );

        return createPortal(
            (
                <Fade
                    appear
                    toggleDisplay
                    onEnter={this.handleEnter}
                    onEntering={this.handleEntering}
                    onEntered={this.handleEntered}
                    onExit={this.handleExit}
                    onExited={this.handleExited}
                    in={!!visible}
                    unmountOnExit={unmountOnclose}
                    animation={fade}>
                    <Align
                        ref={this.alignRef}
                        style={style}
                        flip={flip}
                        offset={offset}
                        target={node}
                        placement={propPlacement}
                        alignment={alignment}
                        verticalCenter={verticalCenter}>
                        {child}
                    </Align>
                </Fade>
            ),
            mountNode
        );
    }
}