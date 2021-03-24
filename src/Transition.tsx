import * as React from "react"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import omit from "reap-utils/lib/omit"
import PropTypes from "prop-types"
import {getNode} from "./utils"
import Placeholder from "./placeholder"

export const ENTER = "enter"
export const ENTERING = "entering"
export const ENTERED = "entered"
export const EXIT = "exit"
export const EXITING = "exiting"
export const EXITED = "exited"
export const UNMOUNTED = "unmounted"

type stateType = "enter" | "entering" | "entered" | "exit" | "exiting" | "exited"
type callback = (node: HTMLElement | null) => void

export interface TransitionProps {
    in: boolean
    timeout?: number
    unmountOnExit?: boolean
    appear?: boolean
    children: ((state: stateType) => React.ReactElement) | React.ReactElement
    onEnter?: callback
    onEntering?: callback
    onEntered?: callback
    onExit?: callback
    onExiting?: callback
    onExited?: callback
}

interface State {
    status: stateType | "unmounted"
}

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

export default class Transition extends React.Component<TransitionProps, State> {
    private ref = React.createRef<HTMLDivElement>()
    private timer: any = null
    private nextTimer: any = null
    private next: Function | null = null

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
        let status

        if (_in) {
            status = appear ? EXITED : ENTERED
        } else {
            status = unmountOnExit ? UNMOUNTED : EXITED
        }

        this.state = {
            status: status as stateType
        }
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
                } as TransitionProps)
            } else {
                handleFuncProp(onEntered)(getNode(this.ref))
            }
        }
    }

    componentDidUpdate(prevProps: TransitionProps) {
        let {
            props: {
                in: _in
            },
            state: {
                status
            },
            next
        } = this

        if (_in !== prevProps.in) {
            status = _in ? ENTER : EXIT

            this.clearTimer()
            this.clear()
            this.updateStatus(status as stateType)
        } else if (next) {
            this.callNext(next)
        }
    }

    componentWillUnmount() {
        this.clearTimer()
        this.clear()
    }

    //in case findDOMNode returns null
    static getDerivedStateFromProps(nextProps: TransitionProps, nextState: State) {
        if (nextProps.in && nextState.status === UNMOUNTED) {
            return {
                status: EXITED
            }
        }

        return nextState
    }

    clearTimer() {
        if (this.timer !== null) {
            clearTimeout(this.timer)

            this.timer = null
        }
    }

    callNext(callback: Function) {
        if (!this.props.timeout) {
            return callback()
        }

        this.nextTimer = setTimeout(this.safeCallback(callback), 20)
    }

    clear() {
        this.next = null

        if (this.nextTimer !== null) {
            clearTimeout(this.nextTimer)

            this.nextTimer = null
        }
    }

    safeCallback(callback: Function) {
        const node = getNode(this.ref)
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

    delayEnterOrExit(timeout: number, callback: Function) {
        if (!timeout) {
            return callback()
        }

        this.timer = setTimeout(this.safeCallback(callback), timeout)
    }

    handleEnter(node: HTMLElement | null) {
        const {
            onEntering,
            onEntered,
            timeout = 0
        } = this.props
        const enteredCallback = () => {
            this.setState({
                status: ENTERED
            })
            handleFuncProp(onEntered)(node)
        }
        this.next = () => {
            this.next = null

            this.delayEnterOrExit(timeout as number, enteredCallback)
        }

        this.setState({
            status: ENTERING
        })
        handleFuncProp(onEntering)(node)
    }

    handleExit(node: HTMLElement | null) {
        const {
            onExiting,
            onExited,
            timeout,
            unmountOnExit
        } = this.props
        const unmount = () => {
            this.next = null

            this.setState({
                status: UNMOUNTED
            })
        }
        const exitedCallback = () => {
            this.setState(
                {
                    status: EXITED
                }
            )
            handleFuncProp(onExited)(node)
        }
        this.next = () => {
            this.next = unmountOnExit ? unmount : null

            this.delayEnterOrExit(timeout as number, exitedCallback)
        }

        this.setState({
            status: EXITING
        })
        handleFuncProp(onExiting)(node)
    }

    updateStatus(status: stateType) {
        const {
            onEnter,
            onExit
        } = this.props
        const node = getNode(this.ref)

        this.setState({
            status
        })

        if (status === ENTER) {
            this.next = () => this.handleEnter(node)
            handleFuncProp(onEnter)(node)
        } else if (status === EXIT) {
            this.next = () => this.handleExit(node)
            handleFuncProp(onExit)(node)
        }
    }

    renderEl() {
        const {
            status
        } = this.state

        if (status === UNMOUNTED) {
            return null
        }

        const {
            children,
            ...otherProps
        } = this.props

        const restProps = omit(
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

        if (typeof children === "function") {
            return children(status)
        }

        const child = React.Children.only(children) as React.ReactElement

        return React.cloneElement(child, restProps)
    }

    render() {
        const el = this.renderEl()

        if (!el) {
            return null
        }

        return (
            <>
                {/* div: for finding the node */}
                <Placeholder ref={this.ref}/>
                {el}
            </>
        )
    }
}