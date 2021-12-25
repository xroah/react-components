import * as React from "react"
import {bool, func} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {only, Transition} from "reap-utils/lib/react"
import {DivAttrs} from "../Commons/consts-and-types"
import {chainFunction} from "reap-utils/lib"

type Callback = () => void

export interface CollapseProps extends DivAttrs {
    open?: boolean
    onShow?: Callback
    onShown?: Callback
    onHide?: Callback
    onHidden?: Callback
}

const Collapse: React.FunctionComponent<CollapseProps> = (
    {
        className,
        open,
        onShow,
        onShown,
        onHide,
        onHidden,
        children,
        ...restProps
    }
) => {
    if (!children) {
        return null
    }

    let c: React.ReactElement = only(children)
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
    const handleEnter = chainFunction(
        updateHeight,
        onShow
    )
    const handleEntered = chainFunction(
        (node?: HTMLElement) => updateHeight(node, ""),
        onShown
    )
    const handleExiting = (node?: HTMLElement) => {
        updateHeight(node, "")
    }
    const handleExit = chainFunction(
        updateHeight,
        onHide
    )

    return (
        <Transition
            in={!!open}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={onHidden}>
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
                            ),
                            ...restProps
                        }
                    )
                }
            }
        </Transition>
    )
}

Collapse.propTypes = {
    open: bool,
    onShow: func,
    onShown: func,
    onHide: func,
    onHidden: func
}

export default Collapse