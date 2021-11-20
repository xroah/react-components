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
type Callback = (node?: HTMLElement) => void

export interface CSSTransitionProps {
    in: boolean
    timeout?: number
    unmountOnExit?: boolean
    appear?: boolean
    children: ((state: stateType) => React.ReactElement) | React.ReactElement
    onEnter?: Callback
    onEntering?: Callback
    onEntered?: Callback
    onExit?: Callback
    onExiting?: Callback
    onExited?: Callback
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
                this.handleCallback("onEntered")
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

            this.switchState(status)
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

        const {fn, timeout} = this.next
        const cb = this.safeCallback(fn.bind(this))

        if (!this.props.timeout) {
            return cb()
        }

        this.nextTimer = window.setTimeout(cb, timeout)
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

    performEnter() {
        this.setNext(this.performEntering)
        this.setState(
            {status: ENTER},
            () => this.handleCallback("onEnter")
        )
    }

    performEntering() {
        this.setNext(this.performEntered, this.props.timeout)
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
        this.setNext(this.performExited, this.props.timeout)
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

    getNode() {
        const {current} = this.placeholderRef

        if (current) {
            return current.nextElementSibling
        }

        return null
    }

    render() {
        const {
            status
        } = this.state
        const div = (
            <div
                style={{display: "none"}}
                ref={this.placeholderRef} >
                A placeholder for find DOM node,
                due to findDOMNode has been deprecated in StrictMode
            </div>
        )

        if (status === UNMOUNTED) {
            return null
        }

        const {
            children,
            ...restProps
        } = this.props

        const props = omitProps(
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
                    {children(status)}
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