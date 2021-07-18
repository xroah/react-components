import * as React from "react"
import handleFuncProp from "../handle-func-prop"
import omit from "../../omit"
import getNextNodeByRef from "../get-next-node-by-ref"
import Placeholder from "../Placeholder"
import {
    TransitionProps,
    TransitionState,
    componentState,
    stateType
} from "./interface"
import {
    ENTER,
    ENTERED,
    ENTERING,
    EXIT,
    EXITING,
    EXITED,
    UNMOUNTED
} from "./constants"
import PropTypes from "prop-types"

export const propTypes = {
    in: PropTypes.bool,
    timeout: PropTypes.number,
    unmountOnExit: PropTypes.bool,
    appear: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
}

export default class Transition extends React.Component<TransitionProps, TransitionState> {
    private ref = React.createRef<HTMLDivElement>()
    private timer: any = null
    private nextTimer: any = null

    static propTypes = {
        ...propTypes
    }

    constructor(props: TransitionProps) {
        super(props)

        const {
            in: _in,
            unmountOnExit,
            appear
        } = props
        let status: componentState

        if (_in) {
            status = appear ? EXITED : ENTERED
        } else {
            status = unmountOnExit ? UNMOUNTED : EXITED
        }

        this.state = {status}
    }

    componentDidMount() {
        const {
            onEntered,
            appear,
            in: _in
        } = this.props

        if (_in) {
            if (appear) {
                this.componentDidUpdate({in: false} as any)
            } else {
                handleFuncProp(onEntered)(getNextNodeByRef(this.ref))
            }
        }
    }

    componentDidUpdate(prevProps: TransitionProps) {
        let {in: _in} = this.props

        if (_in !== prevProps.in) {
            this.clear()
            this.updateStatus(_in ? ENTER : EXIT)
        }
    }

    componentWillUnmount() {
        this.clear()
    }

    //in case findDOMNode returns null
    static getDerivedStateFromProps(nextProps: TransitionProps, nextState: TransitionState) {
        if (nextProps.in && nextState.status === UNMOUNTED) {
            return {status: EXITED}
        }

        return nextState
    }

    clear() {
        if (this.nextTimer !== null) {
            clearTimeout(this.nextTimer)
        }

        if (this.timer !== null) {
            clearTimeout(this.timer)
        }

        this.timer = this.nextTimer = null
    }

    safeCallback(callback: Function) {
        const node = getNextNodeByRef(this.ref)
        const _callback = () => {
            //node may removed(unmounted)
            //Can't perform a React state update on an unmounted component
            if (node && !node.parentNode) {
                return
            }

            callback()
        }

        return _callback
    }

    handleEnter() {
        const {onEntering, onEntered} = this.props
        const node = getNextNodeByRef(this.ref)

        this.setState(
            {status: ENTERING},
            () => handleFuncProp(onEntering)(node)
        )
        this.onTransitionEnd(
            () => this.setState(
                {status: ENTERED},
                () => handleFuncProp(onEntered)(node)
            )
        )
    }

    handleExit() {
        const {onExiting} = this.props
        const node = getNextNodeByRef(this.ref)

        this.setState(
            {status: EXITING},
            () => handleFuncProp(onExiting)(node)
        )
        this.onTransitionEnd(
            () => this.setState(
                {status: EXITED},
                this.afterExited.bind(this)
            )
        )
    }

    afterExited() {
        const node = getNextNodeByRef(this.ref)
        const {unmountOnExit, onExited} = this.props

        if (unmountOnExit) {
            this.setState({status: UNMOUNTED})
        }

        handleFuncProp(onExited)(node)
    }

    updateStatus(status: componentState) {
        const {onEnter, onExit} = this.props
        const TIMEOUT = 20
        const TIMER = "nextTimer"

        this.setState(
            {status},
            () => {
                const node = getNextNodeByRef(this.ref)

                if (status === ENTER) {
                    this.setTimeout(this.handleEnter.bind(this), TIMEOUT, TIMER)
                    handleFuncProp(onEnter)(node)
                } else {
                    this.setTimeout(this.handleExit.bind(this), TIMEOUT, TIMER)
                    handleFuncProp(onExit)(node)
                }
            }
        )
    }

    setTimeout(cb: Function, timeout: number, timer: "timer" | "nextTimer") {
        this[timer] = setTimeout(
            () => {
                cb()

                this[timer] = null
            },
            timeout
        )
    }

    onTransitionEnd(callback: Function) {
        const {timeout = 0} = this.props

        this.setTimeout(callback, timeout, "timer")
    }

    renderEl(status: stateType) {
        const {children, ...otherProps} = this.props

        if (typeof children === "function") {
            return children(status)
        }

        return React.cloneElement(
            React.Children.only(children) as React.ReactElement,
            omit(
                otherProps,
                [
                    "in",
                    "timeout",
                    "appear",
                    "onEnter",
                    "onEntering",
                    "onEntered",
                    "onExit",
                    "onExiting",
                    "onExited",
                    "unmountOnExit"
                ]
            )
        )
    }

    render() {
        const {status} = this.state

        if (status === UNMOUNTED) {
            return null
        }

        return (
            <>
                <Placeholder ref={this.ref} />
                {this.renderEl(status)}
            </>
        )
    }
}