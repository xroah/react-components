import * as React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import {
    classNames,
    ElementRect,
    OverlayContext,
    getElementRect
} from "./utils";

export interface OverlayProps extends React.HTMLAttributes<HTMLElement> {
    position?: "top" | "right" | "bottom" | "left";
    align?: "left" | "center" | "right";
    mountTo?: HTMLElement;
    visible?: boolean;
    popup?: React.ReactNode;
}

interface OverlayState {
    visible: boolean;
    from: string;
    rect?: ElementRect;
}
class Popup extends React.Component {
    render() {
        // console.log(this.context)
        return <div>Popup</div>
    }
}
export default class Overlay extends React.Component<OverlayProps, OverlayState> {

    private mountNode: HTMLElement | null = null;

    constructor(props: OverlayProps) {
        super(props);

        this.state = {
            visible: !!props.visible,
            from: "state"
        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        const { visible } = this.state;
        const src = evt.currentTarget;

        this._setState({
            visible: !visible,
            rect: getElementRect(src)
        });
        console.log(evt.currentTarget)
    };

    _setState(arg: any, callback?: () => void) {
        this.setState({
            ...arg,
            from: "state"
        }, callback);
    }

    static getDerivedStateFromProps(prop: OverlayProps, state: OverlayState) {
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
    }
    
    open = () => {
        const { visible } = this.state;

        if (!visible) {
            this._setState({
                visible: true
            });
        }
    };

    close = () => {
        const { visible } = this.state;

        if (visible) {
            this._setState({
                visible: false
            });
        }
    };

    renderChildren() {
        const { children, className } = this.props;console.log(this.props)
        const child = React.Children.only(children) as React.ReactElement;

        return React.cloneElement(
            child,
            {
                className: classNames(child.props.className, className),
                onClick: this.handleClick
            }
        );
    }

    renderPortal() {
        let {
            state: {
                visible,
                rect = {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                }
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
            left: rect.left,
            top: rect.top + rect.height
        };

        if (!visible && !mountNode) return null;

        if (!mountNode) {
            mountNode = this.mountNode = document.createElement("div");
            mountNode.style.cssText = "position: absolute; left: 0; top: 0;";
            mountTo.appendChild(mountNode);
        }
        return createPortal(
            (
                <OverlayContext.Provider value={{close: this.close}}>
                    <div style={style}>{popup}</div>
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