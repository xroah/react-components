import * as React from "react"
import classNames from "../../class-names"
import {handleFuncProp, only} from "../main"
import {ENTERED, EXITED} from "./constants"
import {string} from "prop-types"
import {NoTransitionProps, State} from "./interface"
import propTypes from "./propTypes"
import BaseTransition from "./BaseTransition"

//compatible with Transition
export default class NoTransition extends
    BaseTransition<NoTransitionProps, State> {
    static propTypes = {
        ...propTypes,
        showClass: string
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

        if (_in) {
            handleFuncProp(onEnter)()
            handleFuncProp(onEntering)()
            handleFuncProp(onEntered)()
        } else {
            handleFuncProp(onExit)()
            handleFuncProp(onExiting)()
            handleFuncProp(onExited)()
        }
    }

    render() {
        const {
            children,
            in: _in,
            unmountOnExit,
            showClass
        } = this.props
        const child = only(children as React.ReactElement)

        if (!_in && unmountOnExit) {
            return null
        }

        if (typeof children === "function") {
            return children(_in ? ENTERED : EXITED)
        }

        return React.cloneElement(
            child,
            {
                className: classNames(
                    child.props.className,
                    showClass
                )
            }
        )
    }

}