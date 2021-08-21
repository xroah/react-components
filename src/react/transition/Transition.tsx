import * as React from "react"
import handleFuncProp from "../handle-func-prop"
import omit from "../../omit"
import {
    TransitionProps,
    TransitionState,
    stateType,
    Next
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
import propTypes from "./propTypes"
import BaseTransition from "./BaseTransition"

export default class Transition extends
    BaseTransition<TransitionProps, TransitionState> {

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

        this.state = {
            status: status
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

            this.clearNext()
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
        nextState: TransitionState
    ) {
        if (nextProps.in && nextState.status === UNMOUNTED) {
            return {
                status: EXITED
            }
        }

        return nextState
    }

    setNext(fn: Function, timeout = 0) {
        this.next = {
            fn,
            timeout: timeout + 20 //ensure transition ended
        }
    }

    performNext() {
        if (!this.next) {
            return
        }

        const {
            fn,
            timeout
        } = this.next
        const cb = fn.bind(this)

        if (!this.props.timeout) {
            return cb()
        }

        this.nextTimer = window.setTimeout(
            () => {
                this.nextTimer = null

                this.safeCallback(cb)
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

    enter() {
        this.setNext(this.entering)
        this.setState(
            {
                status: ENTER
            },
            () => handleFuncProp(this.props.onEnter)()
        )
    }

    entering() {
        const {
            timeout,
            onEntering
        } = this.props

        this.setNext(this.entered, timeout)
        this.setState(
            {
                status: ENTERING
            },
            () => handleFuncProp(onEntering)()
        )
    }

    entered() {
        this.clearNext()
        this.setState(
            {
                status: ENTERED
            },
            () => handleFuncProp(this.props.onEntered)()
        )
    }


    exit() {
        this.setNext(this.exiting)
        this.setState(
            {
                status: EXIT
            },
            () => handleFuncProp(this.props.onExiting)()
        )
    }

    exiting() {
        const {
            timeout,
            onExiting
        } = this.props

        this.setNext(this.exited, timeout)
        this.setState(
            {
                status: EXITING
            },
            () => handleFuncProp(onExiting)()
        )
    }

    exited() {
        const {
            unmountOnExit,
            onExited
        } = this.props

        if (unmountOnExit) {
            this.setNext(this.unmount)
        } else {
            this.clearNext()
        }

        this.setState(
            {
                status: EXITED
            },
            () => handleFuncProp(onExited)()
        )
    }

    unmount() {
        this.clearNext()
        this.setState({
            status: UNMOUNTED
        })
    }

    switchState(status: stateType) {
        this.setState({status})

        if (status === ENTER) {
            this.setNext(this.enter)
        }
        else if (status === EXIT) {
            this.setNext(this.exit)
        }
    }

    render() {
        const {
            status
        } = this.state
        const div = <div className="d-none" ref={this.placeholderRef} />

        if (status === UNMOUNTED) {
            return null
        }

        const {
            children,
            ...restProps
        } = this.props

        omit(
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
                "onExited"
            ]
        )

        if (typeof children === "function") {
            return (
                <>
                    {div}
                    {children(status!)}
                </>
            )
        }

        const child = React.Children.only(children) as React.ReactElement

        return (
            <>
                {div}
                {React.cloneElement(child, restProps)}
            </>
        )
    }

}