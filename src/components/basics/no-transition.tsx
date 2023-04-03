import React, { cloneElement, ReactElement } from "react"
import { TimeoutProps } from "react-transition-group/Transition"
import { classnames } from "../utils"

type BaseProps = Partial<TimeoutProps<HTMLElement>>

interface NOTransitionProps extends BaseProps {
    children: React.ReactNode
    showClass?: string
    showDisplay?: string
}

class NoTransition extends React.Component<NOTransitionProps> {
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
            in: _in,
            showClass = "show",
            showDisplay
        } = this.props

        if (!_in && unmountOnExit) {
            return null
        }

        const c = children as ReactElement
        const classes = classnames(
            c.props.className,
            _in && showClass
        )

        return cloneElement(
            c,
            {
                className: classes,
                style: {
                    ...c.props.style,
                    display: _in ? showDisplay : "none"
                }
            }
        )
    }
}

export default NoTransition