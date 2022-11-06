import React from "react"
import { EndListenerProps } from "react-transition-group/Transition"
import { ToggleEvents } from "./types"

type BaseProps = Omit<EndListenerProps<HTMLElement>, "addEndListener">

interface NOTransitionProps extends ToggleEvents, BaseProps {
    children: React.ReactNode
}

class NOTransition extends React.Component<NOTransitionProps> {
    componentDidUpdate(prevProps: NOTransitionProps) {
        const {
            onEnter,
            onEntering,
            onEntered,
            onExit,
            onExiting,
            onExited,
            in: _in
        } = this.props

        if (prevProps.in !== _in) {
            if (_in) {
                onEnter?.(false)
                onEntering?.(false)
                onEntered?.(false)
            } else {
                onExit?.()
                onExiting?.()
                onExited?.()
            }
        }
    }

    render() {
        if (this.props.unmountOnExit) {
            return null
        }

        return this.props.children
    }
}

export default NOTransition