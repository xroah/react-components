import * as React from "react"
import {findDOMNode} from "react-dom"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import omit from "reap-utils/lib/omit"

export const ENTER = "enter"
export const ENTERING = "entering"
export const ENTERED = "entered"
export const EXIT = "exit"
export const EXITING = "exiting"
export const EXITED = "exited"
export const UNMOUNTED = "unmounted"

type stateType = "enter" | "entering" | "entered" | "exit" | "exiting" | "exited"

export interface CSSTransitionProps {
    in: boolean
    timeout?: number
    unmountOnExit?: boolean
    appear?: boolean
    children: ((state: stateType) => React.ReactElement) | React.ReactElement
    onEnter?: (node: HTMLElement) => void
    onEntering?: (node: HTMLElement) => void
    onEntered?: (node: HTMLElement) => void
    onExit?: (node: HTMLElement) => void
    onExiting?: (node: HTMLElement) => void
    onExited?: (node: HTMLElement) => void
}

interface State {
    status: stateType | "unmounted"
}

export default class CSSTransition extends React.Component<CSSTransitionProps, State> {
    timer: NodeJS.Timeout | null = null
    nextTimer: number | null = null
    next: Function | null = null

    constructor(props: CSSTransitionProps) {
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
                } as CSSTransitionProps)
            } else {
                handleFuncProp(onEntered)(findDOMNode(this))
            }
        }
    }

    componentDidUpdate(prevProps: CSSTransitionProps) {
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
            this.nextTick(next)
        }
    }

    componentWillUnmount() {
        this.clearTimer()
        this.clear()
    }

    //in case findDOMNode returns null
    static getDerivedStateFromProps(nextProps: CSSTransitionProps, nextState: State) {
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

    nextTick(callback: Function) {
        if (!this.props.timeout) {
            return callback()
        }

        this.nextTimer = requestAnimationFrame(this.safeCallback(callback))
    }

    clear() {
        this.next = null

        if (this.nextTimer !== null) {
            cancelAnimationFrame(this.nextTimer)

            this.nextTimer = null
        }
    }

    safeCallback(callback: Function) {
        const node = findDOMNode(this) as HTMLElement
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

    handleEnter(node: HTMLElement) {
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

    handleExit(node: HTMLElement) {
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
            onEnter, onExit
        } = this.props
        const node = findDOMNode(this) as HTMLElement

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

    render() {
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
                "onExited"
            ]
        )

        if (typeof children === "function") {
            return children(status)
        }

        const child = React.Children.only(children) as React.ReactElement

        return React.cloneElement(child, restProps)
    }
}