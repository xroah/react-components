import * as React from "react"
import {
    bool,
    func,
    number
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import reflow from "reap-utils/lib/dom/reflow"
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
        style,
        children
    }: CollapseProps
) {
    if (!React.isValidElement(children)) {
        return <>{children}</>
    }

    const [height, updateHeight] = React.useState<number | undefined>(0)
    const classes = classNames(classNames, "collapse")
    const [cls, updateClass] = React.useState(classes)
    const showClass = classNames(classes, "show")
    const collapsingClass = classNames(className, "collapsing")
    const handleEnter = () => {
        handleFuncProp(onShow)()
        updateClass(collapsingClass)
    }
    const handleEntering = (node?: HTMLElement) => {
        if (node) {
            updateHeight(node.scrollHeight)
        }
    }
    const handleEntered = () => {
        updateHeight(undefined)
        handleFuncProp(onShown)()
        updateClass(showClass)
    }
    const handleExited = () => {
        handleFuncProp(onHidden)()
        updateClass(collapsingClass)
    }
    const handleExiting = (node?: HTMLElement) => {
        if (node) {
            reflow(node)
        }

        updateHeight(undefined)
        updateClass(collapsingClass)
    }
    const handleExit = (node?: HTMLElement) => {
        handleFuncProp(onHide)()

        if (node) {
            updateHeight(node.scrollHeight)
        }

    }

    return (
        <Transition
            in={!!open}
            timeout={350!}
            onEnter={handleEnter}
            onEntering={handleEntering}
            onEntered={handleEntered}
            onExit={handleExit}
            onExiting={handleExiting}
            onExited={handleExited}>
            {
                React.cloneElement(
                    children,
                    {
                        className: cls,
                        style: {
                            ...style,
                            height
                        }
                    }
                )
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