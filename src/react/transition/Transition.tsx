import * as React from "react"
import {handleFuncProp} from "../main"
import {omit} from "../../main"
import {
    ENTER,
    ENTERED,
    ENTERING,
    EXIT,
    EXITED,
    EXITING,
    UNMOUNTED
} from "./constants"
import {
    Next,
    State,
    stateType,
    TransitionProps
} from "./interface"
import Placeholder from "../Placeholder"
import propTypes from "./propTypes"
import {getNextNodeByRef} from ".."
import {isUndef} from "../.."
import {getTransitionDuration} from "../../dom"

export default class Transition extends
    React.Component<TransitionProps, State> {
    nextTimer: number | null = null
    next: Next | null = null
    placeholderRef = React.createRef<HTMLDivElement>()

    static propTypes = propTypes

    constructor(props: TransitionProps) {
        super(props)

        const {
            in: _in,
            unmountOnExit,
            appear
        } = props
        let status: stateType

        if (_in) {
            status = appear ? EXITED : ENTERED
        }
        else {
            status = unmountOnExit ? UNMOUNTED : EXITED
        }

        this.state = {status}
    }

    componentDidMount() {
        const {appear, in: _in} = this.props

        if (_in) {
            if (appear) {
                this.componentDidUpdate({in: false} as TransitionProps)
            }
            else {
                this.handleCallback("onEntered")
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
            }
        } = this

        if (_in !== prevProps.in) {
            status = _in ? ENTER : EXIT

            this.switchState(status)
        }
        else {
            this.performNext()
        }
    }

    componentWillUnmount() {
        this.clearNext()
    }

    //in case findDOMNode returns null
    static getDerivedStateFromProps(
        nextProps: TransitionProps,
        nextState: State
    ) {
        if (nextProps.in && nextState.status === UNMOUNTED) {
            return {
                status: EXITED
            }
        }

        return nextState
    }

    setNext(fn: Function, timeout = 0) {
        let called = false
        const TIME_PADDING = 5
        const cb = () => {
            // prevent from calling multiple times
            if (!called) {
                called = true

                fn.call(this)
            }
        }

        this.next = {
            fn: this.safeCallback(cb),
            timeout: timeout + TIME_PADDING
        }
    }

    performNext() {
        if (!this.next) {
            return
        }

        const {status} = this.state

        /**
         * For CSSTransition, the transition property
         * or class may add when entering or exiting,
         */
        if (
            (status === "entering" || status === "exiting") &&
            isUndef(this.props.timeout)
        ) {
            const timeout = this.getTimeout()

            if (timeout && timeout !== this.next.timeout) {
                this.next.timeout = timeout
            }
        }

        const {fn, timeout} = this.next

        if (!timeout) {
            return fn()
        }

        this.nextTimer = window.setTimeout(
            () => {
                this.nextTimer = null

                this.clearNext()
                fn()
            },
            timeout
        )
    }

    clearNext() {
        this.next = null

        if (this.nextTimer !== null) {
            clearTimeout(this.nextTimer)

            this.nextTimer = null
        }
    }

    safeCallback(callback: Function) {
        const _callback = () => {
            const {current} = this.placeholderRef
            //node may removed(unmounted) 
            //Can't perform a React state update on an unmounted component
            if (current && !current.parentNode) {
                return
            }

            callback()
        }

        return _callback
    }

    handleCallback(name: string) {
        const cb = handleFuncProp((this.props as any)[name])

        cb(this.getNode())
    }

    getNode() {
        return getNextNodeByRef(this.placeholderRef)
    }

    getTimeout() {
        const {timeout} = this.props

        if (isUndef(timeout)) {
            const node = this.getNode()

            if (node) {
                return getTransitionDuration(node as HTMLElement)
            }

            return 0
        }

        return timeout
    }

    performEnter() {
        this.setNext(this.performEntering)
        this.setState(
            {status: ENTER},
            () => this.handleCallback("onEnter")
        )
    }

    performEntering() {
        this.setNext(this.performEntered, this.getTimeout())
        this.setState(
            {status: ENTERING},
            () => this.handleCallback("onEntering")
        )
    }

    performEntered() {
        this.clearNext()
        this.setState(
            {status: ENTERED},
            () => this.handleCallback("onEntered")
        )
    }

    performExit() {
        this.setNext(this.performExiting)
        this.setState(
            {status: EXIT},
            () => this.handleCallback("onExit")
        )
    }

    performExiting() {
        this.setNext(this.performExited, this.getTimeout())
        this.setState(
            {status: EXITING},
            () => this.handleCallback("onExiting")
        )
    }

    performExited() {
        if (this.props.unmountOnExit) {
            this.setNext(this.unmount)
        } else {
            this.clearNext()
        }

        this.setState(
            {status: EXITED},
            () => this.handleCallback("onExited")
        )
    }

    unmount() {
        this.clearNext()
        this.setState({status: UNMOUNTED})
    }

    onTransitionEnd = () => {
        if (this.next) {
            this.next.fn()
        }
    }

    switchState(status: stateType) {
        this.clearNext()

        if (status === ENTER) {
            this.setNext(this.performEnter)
        }
        else if (status === EXIT) {
            this.setNext(this.performExit)
        }

        this.setState({status})
    }

    render() {
        const {
            status
        } = this.state
        const div = <Placeholder ref={this.placeholderRef} />

        if (status === UNMOUNTED) {
            return null
        }

        const {
            children,
            ...restProps
        } = this.props

        const props = omit(
            restProps,
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

            ]
        )

        if (typeof children === "function") {
            let child = React.Children.only(children(status))
            child = React.cloneElement(
                child,
                {onTransitionEnd: this.onTransitionEnd}
            )

            return (
                <>
                    {div}
                    {child}
                </>
            )
        }

        const child = React.Children.only(children) as React.ReactElement

        return (
            <>
                {div}
                {React.cloneElement(child, props)}
            </>
        )
    }

}