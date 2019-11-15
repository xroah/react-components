import * as React from "react";
import {
    classNames,
    ElementRect,
    getElementRect,
    OverlayContext
} from "./utils";
import Popup from "./Popup";

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
    rect?: ElementRect;
}

export default class Overlay extends React.Component<OverlayProps, OverlayState> {

    srcEl: HTMLElement | null = null;

    constructor(props: OverlayProps) {
        super(props);

        this.state = {
            visible: !!props.visible
        };
    }

    handleClick = (evt: React.MouseEvent<HTMLElement & HTMLButtonElement>) => {
        let {
            state: { visible },
            props: { children }
        } = this;
        let src = evt.currentTarget;
        let rect: ElementRect | undefined = undefined;
        let child = React.Children.only(children) as React.ReactElement;
        visible = !visible;
        this.srcEl = src;

        //disabled
        if (src.disabled || src.classList.contains("disabled")) return;

        if (visible) {
            rect = getElementRect(src);
        }

        this.setState({
            visible,
            rect
        });
        
        if (children && child.props.onClick) {
            child.props.onClick(evt);
        }
    };

    handleResetPosition = () => {
        this.setState({
            rect: getElementRect(this.srcEl as HTMLElement)
        });
    };

    close = () => {
        const { visible } = this.state;

        if (visible) {
            this.setState({
                visible: false
            });
        }
    };

    renderChildren() {
        const {
            children,
            className,
            wrapper,
            wrapperProps
        } = this.props as any;

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

    render() {
        const {
            props: {
                popup,
                ...otherProps
            },
            state: {
                rect,
                visible
            }
        } = this;

        return (
            <>
                {this.renderChildren()}
                <OverlayContext.Provider value={{ close: this.close }}>
                    <Popup
                        visible={visible}
                        rect={rect}
                        onResetPosition={this.handleResetPosition}
                        {...otherProps}>{popup}</Popup>
                </OverlayContext.Provider>
            </>
        );
    }

}