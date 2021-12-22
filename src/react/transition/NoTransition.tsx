import {cloneElement} from "react"
import {getFunction, only} from "../main"
import {
    ENTER,
    ENTERED,
    ENTERING,
    EXIT,
    EXITED,
    EXITING,
    UNMOUNTED
} from "./constants"
import {NoTransitionProps} from "./interface"
import propTypes from "./propTypes"
import BaseTransition from "./BaseTransition"

//compatible with Transition
class NoTransition extends BaseTransition<NoTransitionProps> {
    static propTypes = {
        ...propTypes
    }
    static defaultProps = {
        hideOnExit: true
    }

    protected switchState(status: typeof ENTER | typeof EXIT) {
        const node = this.getNode()
        const {
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            unmountOnExit
        } = this.props

        if (status === ENTER) {
            this.setState(
                {status: ENTERING},
                () => {
                    getFunction(onEntering)(node)

                    this.setState(
                        {status: ENTERED},
                        () => getFunction(onEntered)(node)
                    )
                }
            )

            getFunction(onEnter)()

            return
        }

        this.setState(
            {status: EXITING},
            () => {
                getFunction(onExiting)(node)

                this.setState(
                    {status: EXITED},
                    () => {
                        getFunction(onExited)(node)

                        if (unmountOnExit) {
                            this.setState({
                                status: UNMOUNTED
                            })
                        }
                    }
                )
            }
        )

        getFunction(onExit)(node)
    }

    render() {
        const {
            children,
            in: _in,
            hideOnExit
        } = this.props
        const {status} = this.state

        if (status === UNMOUNTED) {
            return null
        }

        if (typeof children === "function") {
            return this.renderChildren(children(status))
        }

        const child = only(children as React.ReactElement)
        const style: React.CSSProperties = {...child.props.style}

        if (hideOnExit && !_in) {
            style.display = "none"
        }

        return this.renderChildren(cloneElement(child, {style}))
    }
}

export default NoTransition