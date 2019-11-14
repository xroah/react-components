import * as React from "react";
import { createPortal } from "react-dom";
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