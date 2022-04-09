import {chainFunction} from "reap-utils/lib"
import {Cb, ElProps, Events, Trigger} from "./common-types"

interface ObjectType {
    handleEnter?: Cb
    handleEntered?: Cb
    handleExit?: Cb
    handleExited?: Cb
    props: Events
}


export function getEventCallbacks<T extends ObjectType>(
    obj: T
) {
    const {
        onShow,
        onShown,
        onHide,
        onHidden
    } = obj.props

    return {
        onEnter: chainFunction(obj.handleEnter, onShow),
        onEntered: chainFunction(obj.handleEntered, onShown),
        onExit: chainFunction(obj.handleExit, onHide),
        onExited: chainFunction(obj.handleExited, onHidden)
    }
}

export function handleOffset(
    offset: number | number[],
    placement?: string
) {
    const isH = placement === "left" || placement === "right"

    if (!Array.isArray(offset)) {
        offset = [offset, offset]
    }

    return {
        mainAxis: isH ? offset[0] : offset[1],
        crossAxis: isH ? offset[1] : offset[0]
    }
}

export function getContainer(selector?: string | HTMLElement) {
    if (!selector) {
        return null
    }

    if (typeof selector === "string") {
        return document.querySelector(selector)
    } else if (selector.nodeType === 1) {
        return selector
    }

    return null
}

export function handleActions(action?: Trigger | Trigger[]) {
    const ret: (keyof ElProps)[] = []

    if (action) {
        if (!Array.isArray(action)) {
            action = [action]
        }

        for (let a of action) {
            switch (a) {
                case "click":
                    ret.push("onClick")
                    break
                case "hover":
                    ret.push("onMouseEnter")
                    ret.push("onMouseLeave")
                    break
                case "focus":
                    ret.push("onFocus")
                    ret.push("onBlur")
                    break
                default:
                // do nothing
            }
        }
    }

    return ret
}