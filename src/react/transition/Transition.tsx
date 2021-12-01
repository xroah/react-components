import * as React from "react"
import {
    ENTER,
    ENTERED,
    ENTERING,
    EXIT,
    EXITED,
    EXITING,
    TIME_PADDING,
    UNMOUNTED
} from "./constants"
import {
    Next,
    State,
    StateType,
    TransitionProps
} from "./interface"
import Placeholder from "../Placeholder"
import propTypes from "./propTypes"
import {
    getNextNodeByRef,
    only,
    handleFuncProp
} from "../main"
import {isUndef, chainFunction} from "../../main"
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
        let status: StateType

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
            props: {in: _in},
            state: {status}
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
            return {status: EXITED}
        }

        return nextState
    }

    setNext(fn: Function, timeout = 0) {
        let called = false
        const cb = () => {
            // prevent from calling multiple times
            if (!called) {
                called = true

                fn.call(this)
            }
        }

        // the setTimeout callback may have not been called,
        // if user operate rapidly in a short period of time
        this.clearNext()

        this.next = {
            fn: this.safeCallback(cb),
            // ensure transitionEnd handler called before setTimeout
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
                this.next.timeout = timeout + TIME_PADDING
            }
        }

        const {fn, timeout} = this.next

        if (!timeout) {
            return fn()
        }

        this.nextTimer = window.setTimeout(
            () => {
                this.nextTimer = null
                this.next = null

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

    performEntering() {
        this.setNext(this.performEntered, this.getTimeout())
        this.setState(
            {status: ENTERING},
            () => this.handleCallback("onEntering")
        )
    }

    performEntered() {
        this.setState(
            {status: ENTERED},
            () => this.handleCallback("onEntered")
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
        }

        this.setState(
            {status: EXITED},
            () => this.handleCallback("onExited")
        )
    }

    unmount() {
        this.setState({status: UNMOUNTED})
    }

    handleTransitionEnd = (evt: React.TransitionEvent) => {
        handleFuncProp(this.props.onTransitionEnd)(evt)

        if (this.next) {
            this.next.fn()
            this.clearNext()
        }
    }

    switchState(status: StateType) {
        if (status === ENTER) {
            this.setNext(this.performEntering)
            this.setState(
                {status: ENTER},
                () => this.handleCallback("onEnter")
            )
        } else if (status === EXIT) {
            this.setNext(this.performExiting)
            this.setState(
                {status: EXIT},
                () => this.handleCallback("onExit")
            )
        }
    }

    render() {
        const {
            state: {status},
            props: {children}
        } = this
        const div = <Placeholder ref={this.placeholderRef} />
        let child: React.ReactElement

        if (status === UNMOUNTED) {
            return null
        }

        if (typeof children === "function") {
            child = only(children(status))
        } else {
            child = only(children as React.ReactElement)
        }

        const {onTransitionEnd: end} = child.props

        child = React.cloneElement(
            child,
            {
                onTransitionEnd: end ? chainFunction(
                    end,
                    this.handleTransitionEnd
                ) : this.handleTransitionEnd
            }
        )

        return (
            <>
                {div}
                {child}
            </>
        )
    }

}