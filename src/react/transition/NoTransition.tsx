import * as React from "react"
import classNames from "../../class-names"
import handleFuncProp from "../handle-func-prop"
import {ENTERED, EXITED} from "./constants"
import PropTypes from "prop-types"
import {NoTransitionProps} from "./interface"
import propTypes from "./propTeyps"

//compatible with Transition
export default class NoTransition extends React.Component<NoTransitionProps> {
    static propTypes = {
        ...propTypes,
        showClass: PropTypes.string
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
                className: classNames(child.props.className, showClass)
            }
        )
    }

}