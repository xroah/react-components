import {cloneElement} from "react"
import {handleFuncProp, only} from "../main"
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

    componentDidUpdate(prevProps: NoTransitionProps) {
        const {in: _in} = this.props

        if (prevProps.in !== _in) {
            this.switchState(_in ? ENTER : EXIT)
        }
    }

    private switchState(status: typeof ENTER | typeof EXIT) {
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
                    handleFuncProp(onEntering)(node)

                    this.setState(
                        {status: ENTERED},
                        () => handleFuncProp(onEntered)(node)
                    )
                }
            )

            handleFuncProp(onEnter)()

            return
        }

        this.setState(
            {status: EXITING},
            () => {
                handleFuncProp(onExiting)(node)

                this.setState(
                    {status: EXITED},
                    () => {
                        handleFuncProp(onExited)(node)

                        if (unmountOnExit) {
                            this.setState({
                                status: UNMOUNTED
                            })
                        }
                    }
                )
            }
        )

        handleFuncProp(onExit)(node)
    }

    render() {
        const {
            children,
            in: _in,
            hideOnExit
        } = this.props
        const {status} = this.state
        const child = only(children as React.ReactElement)
        const style: React.CSSProperties = {...child.props.style}

        if (status === UNMOUNTED) {
            return null
        }

        if (typeof children === "function") {
            return this.renderChildren(children(status))
        }

        if (hideOnExit && !_in) {
            style.display = "none"
        }

        return this.renderChildren(cloneElement(child, {style}))
    }
}

export default NoTransition