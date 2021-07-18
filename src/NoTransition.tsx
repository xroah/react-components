import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import {ENTERED, EXITED} from "./constants"
import PropTypes from "prop-types"
import getNextNodeByRef from "reap-utils/lib/react/get-next-node-by-ref"
import Placeholder from "reap-utils/lib/react/Placeholder"
import {NoTransitionProps} from "./interface"
import {propTypes} from "./prop-types"

//compatible with Transition
export default class NoTransition extends React.Component<NoTransitionProps> {
    private ref = React.createRef<HTMLDivElement>()

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
        const node = getNextNodeByRef(this.ref)

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

    renderEl() {
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

    render() {
        const el = this.renderEl()

        if (!el) {
            return null
        }

        return (
            <>
                <Placeholder ref={this.ref} />
                {el}
            </>
        )
    }

}