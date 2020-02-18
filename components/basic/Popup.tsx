import * as React from "react";
import { createPortal } from "react-dom";
import PropTypes, { number } from "prop-types";
import {
    ElementRect,
    handleFuncProp,
    throttle,
    classNames,
    getElementRect
} from "../utils";
import Fade from "../Fade";

export type position = "top" | "right" | "bottom" | "left";

export interface PopupCommonProps extends React.HTMLAttributes<HTMLElement> {
    placement?: position;
    visible?: boolean;
    flip?: boolean;
    fade?: boolean;
    offset?: number | number[];
    defaultVisible?: boolean;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
}

interface PopupState {
    pos?: position;
    placement?: position;
    left?: number;
    top?: number;
}

export interface PopupProps extends PopupCommonProps {
    alignment?: string;
    mountTo?: HTMLElement;
    unmountOnclose?: boolean;
    node?: HTMLElement;
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

    static propTypes = {
        placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        flip: PropTypes.bool,
        fade: PropTypes.bool,
        offset: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.number)
        ])
    };
    static defaultProps = {
        flip: true,
        fade: true,
        offset: [0, 0],
        defaultVisible: false
    };

    constructor(props: PopupProps) {
        super(props);

        this.state = {};
        this.handleResize = throttle(this.handleResize, 30);
    }

    getAlimentClass() {
        const {
            props: {
                alignmentPrefix,
                placement
            },
            state: { placement: pos }
        } = this;

        return alignmentPrefix && `${alignmentPrefix}-${pos || placement}`;
    }

    componentDidUpdate() {
        const {
            props: {
                visible
            },
            hasEvent
        } = this;

        if (visible) {
            if (!hasEvent) {
                this.addEvent();
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

    handleOffset(offset: number | number[]) {
        let ret: number[];

        if (Array.isArray(offset)) {
            const len = number.length;

            switch (len) {
                case 0:
                    ret = [0, 0];
                    break;
                case 1:
                    ret = Array(2).fill(offset[0]);
                default:
                    ret = offset.slice(0, 2);
            }

            if (!len) {
                ret = [0, 0];
            }
        } else {
            ret = Array(2).fill(offset);
        }

        return ret;
    }

    alignRight = (rect: ElementRect, hOffset: number, vOffset: number) => {
        let left = rect.left + rect.width + hOffset;
        let top = rect.top + vOffset;

        return { left, top, placement: "right" };
    }

    alignTop = (rect: ElementRect, height: number, hOffset: number, vOffset: number) => {
        let left = rect.left + hOffset;
        let top = rect.top - height - vOffset;

        return { left, top, placement: "top" }
    }

    alignLeft = (rect: ElementRect, width: number, hOffset: number, vOffset: number) => {
        let left = rect.left - width - hOffset;
        let top = rect.top + vOffset;

        return { left, top, placement: "left" }
    }

    alignBottom = (rect: ElementRect, hOffset: number, vOffset: number) => {
        let left = rect.left + hOffset;
        let top = rect.top + rect.height + vOffset;

        return { left, top, placement: "bottom" }
    }

    handlePosition() {
        const {
            mountNode,
            props: {
                placement,
                flip,
                node,
                offset,
                verticalCenter
            },
            ref: { current: child }
        } = this;
        let obj: any;

        if (!mountNode || !child || !node) return {};

        const width = child.offsetWidth;
        const height = child.offsetHeight;
        const windowWidth = document.documentElement.clientWidth;
        //innerWidth/innerHeight contains width of scrollbar
        //usually webpage does not have horizontal scrollbar
        const windowHeight = window.innerHeight;
        const [hOffset, vOffset] = this.handleOffset(offset as number);
        const rect = getElementRect(node);

        switch (placement) {
            case "top":
                obj = this.alignTop(rect, height, hOffset, vOffset);

                if (flip && rect.bottom - rect.height < height) {
                    obj = this.alignBottom(rect, hOffset, vOffset);
                }
                break;
            case "right":
                obj = this.alignRight(rect, hOffset, vOffset);

                if (flip && windowWidth - rect.right < width) {
                    obj = this.alignLeft(rect, width, hOffset, vOffset);
                }
                break;
            case "left":
                obj = this.alignLeft(rect, width, hOffset, vOffset);

                if (flip && rect.right - rect.width < width) {
                    obj = this.alignRight(rect, hOffset, vOffset);
                }
                break;
            default:
                obj = this.alignBottom(rect, hOffset, vOffset);

                if (flip && windowHeight - rect.bottom < height) {
                    obj = this.alignTop(rect, height, hOffset, vOffset);
                }
        }

        let { left, top, placement: _placement } = obj;
        left = this.handleAlignment(rect, left, width, windowWidth);

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

    handleAlignment(rect: ElementRect, left: number, width: number, windowWidth: number) {
        const {
            props: {
                alignment,
                placement = "",
                node
            },
        } = this;
        const posMap: any = {
            "top": true,
            "bottom": true
        };

        if (node && (placement in posMap)) {
            switch (alignment) {
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
        }

        return left;
    };

    updatePosition() {
        let { left, top, placement } = this.handlePosition();

        this.setState({
            left,
            top,
            placement
        });
    }

    handleMouseEvent = (evt: React.MouseEvent<HTMLElement>) => {
        const { onMouseLeave, onMouseEnter } = this.props;

        evt.type === "mouseenter" ? handleFuncProp(onMouseEnter)(evt)
            : handleFuncProp(onMouseLeave)(evt);
    }

    handleResize = () => {
        this.updatePosition();
    }

    addEvent() {
        if (this.hasEvent) return;

        const { flip } = this.props;
        this.hasEvent = true;
        document.addEventListener("click", this.handleClickOutSide);
        document.addEventListener("keydown", this.handleKeydown);
        window.addEventListener("resize", this.handleResize);
        flip && window.addEventListener("scroll", this.handleResize);
    };

    removeEvent() {
        if (!this.hasEvent) return;

        this.hasEvent = false;
        document.removeEventListener("click", this.handleClickOutSide);
        document.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("resize", this.handleResize);
        window.removeEventListener("scroll", this.handleResize);
    }

    handleEnter = () => {
        const { onShow, node } = this.props;

        handleFuncProp(onShow)(node);
    };

    handleEntered = () => {
        const { onShown, node } = this.props;

        handleFuncProp(onShown)(node);
    };

    handleEntering = () => {
        //update position, in case calc incorrectly(invisible) when fade in
        this.updatePosition();
    }

    handleExit = () => {
        const { onHide, node } = this.props;

        handleFuncProp(onHide)(node);
    };

    handleExited = () => {
        const { onHidden, node } = this.props;

        handleFuncProp(onHidden)(node);
    };

    render() {
        let {
            props: {
                mountTo = document.body,
                children,
                fade,
                visible,
                className,
                unmountOnclose,
                node
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
        let _children = children as React.ReactElement;

        if (typeof children === "function") {
            _children = children();
        }

        if (
            ((!visible && !mountNode) || !_children) ||
            !node
        ) return null;

        const childClassNames = classNames(
            _children.props.className,
            this.getAlimentClass(),
        );

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
        const child = (
            <div
                style={style}
                ref={this.ref}
                className={className}
                {...mouseEvent}>
                {
                    React.cloneElement(
                        _children,
                        {
                            className: childClassNames
                        }
                    )
                }
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
                    {child}
                </Fade>
            ),
            mountNode
        )
    }
}