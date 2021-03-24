import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import {findDOMNode} from "react-dom"
import {
    TransitionProps,
    ENTERED,
    EXITED,
    propTypes
} from "./Transition"
import PropTypes from "prop-types"

//compatible with Transition(some components animation is configurable)
export interface NoTransitionProps extends TransitionProps {
    activeClass?: string
}

export default class NoTransition extends React.Component<NoTransitionProps> {
    static propTypes = {
        ...propTypes,
        activeClass: PropTypes.string
    }

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
            } else {
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
        } else {
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
            activeClass
        } = this.props
        const child = React.Children.only(children) as React.ReactElement

        if (!_in && unmountOnExit) {
            return null
        }

        if (typeof children === "function") {
            return children(_in ? ENTERED : EXITED)
        }

        return React.cloneElement(
            child,
            {
                className: classNames(child.props.className, activeClass)
            }
        )
    }

}