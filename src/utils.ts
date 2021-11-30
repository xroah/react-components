import {handleFuncProp} from "reap-utils/lib/react";
import {
    Delay,
    Offset,
    Trigger
} from "./types";

export function getAction(action?: Trigger | Trigger[]): Trigger[] {
    if (!action) {
        return []
    }

    if (!Array.isArray(action)) {
        action = [action]
    }

    return action
}

export function getOffset(offset?: Offset) {
    let ret = {
        x: 0,
        y: 0
    }

    if (offset) {
        if (typeof offset === "number") {
            offset = {
                x: offset,
                y: offset
            }
        }

        ret.x = offset.x || 0
        ret.y = offset.y || 0
    }

    return ret
}

export function getDelay(delay?: Delay) {
    let ret = {
        show: 0,
        hide: 0
    }

    if (delay) {
        if (typeof delay === "number") {
            ret = {
                show: delay,
                hide: delay
            }
        } else {
            ret.show = delay.show || 0
            ret.hide = delay.hide || 0
        }
    }

    return ret
}

export function getContainer(mountNode?: null | string | HTMLElement) {
    if (!mountNode) {
        return
    }

    let container: HTMLElement | undefined

    if (typeof mountNode === "string") {
        container = document.querySelector(mountNode) as HTMLElement
    } else if (mountNode.nodeType) {
        container = mountNode
    }

    return container
}

interface Context extends React.Component {
    clearTimer: Function
    delayShow: Function
    delayHide: Function
}

export function createHandler<T>(
    context: Context,
    condition: (evt: T) => boolean,
    showHandlerName: string,
    hideHandlerName?: string
) {
    return (evt: T) => {
        const child = context.props.children as React.ReactElement

        context.clearTimer()

        if (condition(evt)) {
            handleFuncProp(child.props[showHandlerName])(evt)
            context.delayShow()
        } else {
            const name = hideHandlerName || showHandlerName

            handleFuncProp(child.props[name])(evt)
            context.delayHide()
        }
    }
}