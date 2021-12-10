import {cloneElement} from "react"
import {handleFuncProp, only} from "../main"
import {ENTERED, EXITED} from "./constants"
import {NoTransitionProps, State} from "./interface"
import propTypes from "./propTypes"
import BaseTransition from "./BaseTransition"

//compatible with Transition
export default class NoTransition extends
    BaseTransition<NoTransitionProps, State> {
    static propTypes = {
        ...propTypes
    }
    static defaultProps = {
        hiddenOnExited: true
    }

    constructor(props: NoTransitionProps) {
        super(props)
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

        if (prevProps.in === _in) {
            return
        }

        const node = this.getNode()

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
            hiddenOnExited,
        } = this.props
        const child = only(children as React.ReactElement)
        const style: React.CSSProperties = {...child.props.style}

        if (!_in && unmountOnExit) {
            return null
        }

        if (typeof children === "function") {
            return this.renderChildren(children(_in ? ENTERED : EXITED))
        }

        if (hiddenOnExited && !_in) {
            style.display = "none"
        }

        return this.renderChildren(cloneElement(child, {style}))
    }
}