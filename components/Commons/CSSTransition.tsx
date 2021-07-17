import * as React from "react"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import omitProps from "reap-utils/lib/omit"

const ENTER = "enter"
const ENTERING = "entering"
const ENTERED = "entered"
const EXIT = "exit"
const EXITING = "exiting"
const EXITED = "exited"
const UNMOUNTED = "unmounted"

type stateType = "enter" | "entering" | "entered" | "exit" | "exiting" | "exited"

export interface CSSTransitionProps {
    in: boolean
    timeout?: number
    unmountOnExit?: boolean
    appear?: boolean
    children: ((state: stateType) => React.ReactElement) | React.ReactElement
    onEnter?: () => void
    onEntering?: () => void
    onEntered?: () => void
    onExit?: () => void
    onExiting?: () => void
    onExited?: () => void
}

interface Next {
    fn: Function
    timeout: number
}

interface State {
    status: stateType | "unmounted"
}

export default class CSSTransition extends React.Component<CSSTransitionProps, State> {

    nextTimer: number | null = null
    next: Next | null = null
    placeholderRef = React.createRef<HTMLDivElement>()

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
        }
        else {
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
            }
            else {
                handleFuncProp(onEntered)()
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

            this.clearNext()
            this.switchState(status as stateType)
        }
        else if (next) {
            this.performNext()
        }
    }

    componentWillUnmount() {
        this.clearNext()
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

    setNext(fn: Function, timeout = 20) {
        this.next = {
            fn,
            timeout
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
            this.safeCallback(cb),
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
        this.setState({
            status: ENTER
        })
        handleFuncProp(this.props.onEnter)()
    }

    entering() {
        const {
            timeout,
            onEntering
        } = this.props

        this.setState({
            status: ENTERING
        })
        this.setNext(this.entered, timeout)
        handleFuncProp(onEntering)()
    }

    entered() {
        this.clearNext()
        this.setState({
            status: ENTERED
        })
        handleFuncProp(this.props.onEntered)()
    }


    exit() {
        this.setNext(this.exiting)
        this.setState({
            status: EXIT
        })
        handleFuncProp(this.props.onExiting)()
    }

    exiting() {
        const {
            timeout,
            onExiting
        } = this.props

        this.setNext(this.exited, timeout)
        this.setState({
            status: EXITING
        })
        handleFuncProp(onExiting)()
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

        this.setState({
            status: EXITED
        })
        handleFuncProp(onExited)()
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
            ...otherProps
        } = this.props

        omitProps(
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
            return (
                <>
                    {div}
                    {children(status)}
                </>
            )
        }

        const child = React.Children.only(children) as React.ReactElement

        return (
            <>
                {div}
                {React.cloneElement(child, otherProps)}
            </>
        )
    }

}