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
    flip?: boolean;
    fade?: boolean;
    offset?: number | number[];
    defaultVisible?: boolean;
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
    alignment?: string;
    mountTo?: HTMLElement;
    visible?: boolean;
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
        this.handleResize = throttle(this.handleResize.bind(this));
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

    updateNextTick(status?: status) {
        if (!this.props.visible) return;

        requestAnimationFrame(() => {
            this.setState({
                status
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
                status
            }
        } = this;

        if (visible) {
            if (!hasEvent) {
                this.addEvent();
            }

            //just reset the position if already visible
            if (
                status === "measure" ||
                // update when onEntering invoked if enable fade,
                //in case update doubly
                (!fade && !status)
            ) {
                this.updatePosition();
            } else if (status === "update") {
                this.updateNextTick("stable");
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

    mount(el: React.ReactElement, props?: any) {
        const {
            visible,
            unmountOnclose
        } = this.props;
        const { style = {} } = props;

        if (!visible && unmountOnclose) return null;

        style.display = visible ? "block" : "none";

        return React.cloneElement(el, { style });
    }

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
                fade ? (
                    <Fade
                        appear
                        toggleDisplay
                        onEntering={this.handleEntering}
                        in={!!visible}
                        unmountOnExit={unmountOnclose}
                        timeout={150}>
                        {child}
                    </Fade>
                ) : this.mount(child, { style })
            ),
            mountNode
        )
    }
}