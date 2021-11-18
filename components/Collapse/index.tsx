import * as React from "react"
import {
    bool,
    func,
    number
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import Transition from "../Commons/CSSTransition"

type Callback = () => void

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean
    timeout?: number
    onShow?: Callback
    onShown?: Callback
    onHide?: Callback
    onHidden?: Callback
}

function Collapse(
    {
        className,
        open,
        timeout,
        onShow,
        onShown,
        onHide,
        onHidden,
        children
    }: CollapseProps
) {
    if (!React.isValidElement(children)) {
        return <>{children}</>
    }

    const classes = classNames(classNames, "collapse")
    const showClass = classNames(classes, "show")
    const collapsingClass = classNames(className, "collapsing")
    const updateHeight = (
        node?: HTMLElement,
        height?: string
    ) => {
        if (node) {
            if (height !== undefined) {
                node.style.height = height
            } else {
                node.style.height = `${node.scrollHeight}px`
            }
        }
    }
    const handleEnter = () => {
        handleFuncProp(onShow)()
    }
    const handleEntering = (node?: HTMLElement) => {
        updateHeight(node)
    }
    const handleEntered = (node?: HTMLElement) => {
        handleFuncProp(onShown)()
        updateHeight(node, "")
    }
    const handleExited = () => {
        handleFuncProp(onHidden)()
    }
    const handleExiting = (node?: HTMLElement) => {
        updateHeight(node, "")
    }
    const handleExit = (node?: HTMLElement) => {
        handleFuncProp(onHide)()
        updateHeight(node)
    }

    return (
        <Transition
            in={!!open}
            timeout={timeout!}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={handleExited}>
            {
                state => {
                    let cls

                    switch (state) {
                        case "enter":
                        case "entering":
                        case "exiting":
                            cls = collapsingClass
                            break
                        case "entered":
                        case "exit":
                            cls = showClass
                            break
                        default:
                            cls = classes
                    }

                    return React.cloneElement(
                        children,
                        {
                            className: cls
                        }
                    )
                }
            }
        </Transition>
    )
}

Collapse.propTypes = {
    open: bool,
    timeout: number,
    onShow: func,
    onShown: func,
    onHide: func,
    onHidden: func
}
Collapse.defaultProps = {
    timeout: 300
}

export default Collapse