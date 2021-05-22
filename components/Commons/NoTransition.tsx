import * as React from "react"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import classNames from "reap-utils/lib/class-names"
import {findDOMNode} from "react-dom"
import {CSSTransitionProps} from "./CSSTransition"
import omitProps from "reap-utils/lib/omit"

//compatible with CSSTransition(some components animation is configurable)
export interface NoTransitionProps extends CSSTransitionProps {
    showClass?: string
}

export default class NoTransition extends React.Component<NoTransitionProps> {

    componentDidMount() {
        const {
            onEntered,
            appear,
            in: _in
        } = this.props

        if (_in) {
            if (appear) {
                this.componentDidUpdate({
                    in: false
                } as any)
            }
            else {
                handleFuncProp(onEntered)
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
        } = this.props
        const node = findDOMNode(this)
        if (prevProps.in === _in) {
            return
        }

        if (_in) {
            handleFuncProp(onEnter)(node)
            handleFuncProp(onEntering)(node)
            handleFuncProp(onEntered)(node)
        }
        else {
            handleFuncProp(onExit)(node)
            handleFuncProp(onExiting)(node)
            handleFuncProp(onExited)(node)
        }
    }

    render() {
        const {
            children,
            in: _in,
            unmountOnExit,
            showClass,
            ...otherProps
        } = this.props

        if (!_in && unmountOnExit) {
            return null
        }

        if (typeof children === "function") {
            return children(undefined as any)
        }

        omitProps(
            otherProps,
            [
                "onEnter",
                "onEntered",
                "onExit",
                "onExited"
            ]
        )

        const child = React.Children.only(children) as React.ReactElement

        return React.cloneElement(child, {
            className: classNames((child.props as any).className, showClass)
        })
    }

}