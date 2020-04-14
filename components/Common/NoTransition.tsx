import * as React from "react";
import { handleFuncProp, classNames } from "../utils";
import { findDOMNode } from "react-dom";
import { CSSTransitionProps } from "./CSSTransition";

//compatible with CSSTransition(some components animation is configurable)
export interface NoTransitionProps extends CSSTransitionProps {
    showClass?: string;
}

export default class NoTransition extends React.Component<NoTransitionProps> {

    componentDidMount() {
        const {
            onEntered,
            appear,
            in: _in
        } = this.props;

        if (_in) {
            if (appear) {
                this.componentDidUpdate({ in: false } as any);
            } else {
                handleFuncProp(onEntered);
            }
        }
    }

    componentDidUpdate(prevProps: NoTransitionProps) {
        const {
            in: _in,
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited
        } = this.props;
        const node = findDOMNode(this);
        if (prevProps.in === _in) return;

        if (_in) {
            handleFuncProp(onEnter)(node);
            handleFuncProp(onEntering)(node);
            handleFuncProp(onEntered)(node);
        } else {
            handleFuncProp(onExit)(node);
            handleFuncProp(onExiting)(node);
            handleFuncProp(onExited)(node);
        }
    }

    render() {
        const {
            children,
            in: _in,
            unmountOnExit,
            showClass,
            ...otherProps
        } = this.props;

        if (!_in && unmountOnExit) return null;

        if (typeof children === "function") {
            return children(undefined as any);
        }

        delete otherProps.onEnter;
        delete otherProps.onEntered;
        delete otherProps.onExit;
        delete otherProps.onExited;

        const child = React.Children.only(children) as React.ReactElement;

        return React.cloneElement(child, {
            className: classNames((child.props as any).className, showClass)
        });
    }

}