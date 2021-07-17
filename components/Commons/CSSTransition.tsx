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

interface State {
    status: stateType | "unmounted"
}

export default class CSSTransition extends React.Component<CSSTransitionProps, State> {

    timer: number | null = null
    nextTimer: number | null = null
    next: Function | null = null
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

            this.clearTimer()
            this.clearNext()
            this.switchState(status as stateType)
        }
        else if (next) {
            this.nextTick(next)
        }
    }

    componentWillUnmount() {
        this.clearTimer()
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

        this.nextTimer = window.setTimeout(
            this.safeCallback(callback),
            20
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

    delay(timeout: number, callback: Function) {
        if (!timeout) {
            return callback()
        }

        this.timer = window.setTimeout(
            this.safeCallback(callback),
            timeout
        )
    }

    handleEnter() {
        const {
            onEntering,
            onEntered,
            timeout = 0
        } = this.props
        const enteredCallback = () => {
            this.setState({
                status: ENTERED
            })
            handleFuncProp(onEntered)()
        }
        this.next = () => {
            this.next = null

            this.delay(timeout as number, enteredCallback)
        }

        this.setState({
            status: ENTERING
        })
        handleFuncProp(onEntering)()
    }

    handleExit() {
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
            this.setState({
                status: EXITED
            })
            handleFuncProp(onExited)()
        }
        this.next = () => {
            this.next = unmountOnExit ? unmount : null

            this.delay(timeout as number, exitedCallback)
        }

        this.setState({
            status: EXITING
        })
        handleFuncProp(onExiting)()
    }

    switchState(status: stateType) {
        const {
            onEnter,
            onExit
        } = this.props

        this.setState({status})

        if (status === ENTER) {
            this.next = () => this.handleEnter()
            handleFuncProp(onEnter)()
        }
        else if (status === EXIT) {
            handleFuncProp(onExit)()
        }
    }

    render() {
        const {
            status
        } = this.state
        const div = <div className="d-none" ref={this.placeholderRef}/>

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