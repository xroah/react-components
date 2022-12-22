import React from "react"
import { TimeoutProps } from "react-transition-group/Transition"

type BaseProps = Partial<TimeoutProps<HTMLElement>>

interface NOTransitionProps extends BaseProps {
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
        const {
            children,
            unmountOnExit,
            in: _in
        } = this.props

        if (!_in && unmountOnExit) {
            return null
        }

        return children
    }
}

export default NOTransition