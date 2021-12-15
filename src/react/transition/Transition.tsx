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
    StateType,
    TransitionProps
} from "./interface"
import {only, handleFuncProp} from "../main"
import {isUndef, chainFunction} from "../../main"
import {getTransitionDuration} from "../../dom"
import BaseTransition from "./BaseTransition"

class Transition extends BaseTransition<TransitionProps> {
    nextTimer: number | null = null
    next: Next | null = null

    componentWillUnmount() {
        this.clearNext()
    }

    private setNext(fn: Function, timeout = 0) {
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

    protected performNext() {
        if (!this.next) {
            return
        }

        const {status} = this.state
        let {fn, timeout} = this.next

        // For CSSTransition, the transition property
        // or class may add when entering or exiting
        if (
            (status === "entering" || status === "exiting") &&
            isUndef(this.props.timeout) && timeout <= TIME_PADDING
        ) {
            const newTimeout = this.getTimeout()

            if (newTimeout && timeout !== newTimeout) {
                timeout = newTimeout + TIME_PADDING
            }
        }

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

    private clearNext() {
        this.next = null

        if (this.nextTimer !== null) {
            clearTimeout(this.nextTimer)

            this.nextTimer = null
        }
    }

    private safeCallback(callback: Function) {
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

    private handleCallback(name: string) {
        const cb = handleFuncProp((this.props as any)[name])

        cb(this.getNode())
    }

    private getTimeout() {
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

    private performEntering() {
        this.setNext(this.performEntered, this.getTimeout())
        this.setState(
            {status: ENTERING},
            () => this.handleCallback("onEntering")
        )
    }

    private performEntered() {
        this.setState(
            {status: ENTERED},
            () => this.handleCallback("onEntered")
        )
    }

    private performExiting() {
        this.setNext(this.performExited, this.getTimeout())
        this.setState(
            {status: EXITING},
            () => this.handleCallback("onExiting")
        )
    }

    private performExited() {
        if (this.props.unmountOnExit) {
            this.setNext(this.unmount)
        }

        this.setState(
            {status: EXITED},
            () => this.handleCallback("onExited")
        )
    }

    private unmount() {
        this.setState({status: UNMOUNTED})
    }

    private handleTransitionEnd = (evt: React.TransitionEvent) => {
        const {onTransitionEnd, unmountOnExit} = this.props

        handleFuncProp(onTransitionEnd)(evt)

        // transition end can bubble
        if (this.next && evt.target === this.getNode()) {
            this.next.fn()

            if (!unmountOnExit) {
                this.clearNext()
            }
        }
    }

    protected switchState(status: StateType) {
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

        return this.renderChildren(child)
    }

}

export default Transition