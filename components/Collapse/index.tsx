import * as React from "react"
import {
    bool,
    func,
    number
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import Transition from "../Commons/CSSTransition"
import {DivAttrs} from "../Commons/consts-and-types"

type Callback = () => void

interface CollapseProps extends DivAttrs {
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
    let c: React.ReactElement

    if (!React.isValidElement(children)) {
        c = (
            <div>
                {children}
            </div>
        )
    } else {
        c = children
    }

    const classes = classNames(className, "collapse")
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
    const handleEnter = (node?: HTMLElement) => {
        handleFuncProp(onShow)()
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
                        c,
                        {
                            className: classNames(
                                c.props.className,
                                cls
                            )
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