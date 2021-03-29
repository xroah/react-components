import {
    action, DelayObject, trigger
} from "./interface"
import chainFunction from "reap-utils/lib/chain-function"

export function noop() { }

export function handleDelay(delay?: number | DelayObject) {
    let ret: DelayObject = {
        show: 0,
        hide: 0
    }

    if (delay) {
        if (typeof delay === "number") {
            ret.show = ret.hide = delay
        } else {
            ret.show = delay.show || 0
            ret.hide = delay.hide || 0
        }
    }

    return ret
}

export function getAction(a: trigger) {
    let actions: Array<action> = []

    if (Array.isArray(a)) {
        actions = a
    } else {
        actions = [a]
    }

    return actions
}

export function handleOffset(offset?: number | number[]) {
    let ret: number[]

    if (Array.isArray(offset)) {
        const len = offset.length

        switch (len) {
        case 0:
            ret = [0, 0]
            break
        case 1:
            ret = Array(2).fill(offset[0])
            break
        default:
            ret = offset.slice(0, 2)
        }
    } else {
        ret = Array(2).fill(offset === undefined ? 0 : offset)
    }

    return ret
}

//get closest positioned(position is not static) parent
export function getPositionedParent(el: HTMLElement) {
    const body = document.body
    let parent = el
    let ret = body

    while ((parent = parent.parentNode as HTMLElement) && parent !== body) {
        const pos = getComputedStyle(parent).getPropertyValue("position")

        if (pos !== "static") {
            ret = parent

            break
        }
    }

    return ret
}

export function getScrollOffset(el: HTMLElement) {
    let left = 0
    let top = 0
    const body = document.body
    const html = document.documentElement

    if (el === body) {
        left = body.scrollLeft || html.scrollLeft
        top = body.scrollTop || html.scrollTop
    } else {
        left = el.scrollLeft
        top = el.scrollTop
    }

    return {
        left,
        top
    }
}

//get left and top(positioned element) relative to its scroll parent
export function getRelativeOffset(parent: HTMLElement, el: HTMLElement) {
    const parentRect = parent.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    let {
        left,
        top
    } = getScrollOffset(parent)
    let rectLeft = 0
    let rectTop = 0

    if (parent === el) {
        left = top = 0
    } else if (parent === document.body) {
        left += elRect.left
        top += elRect.top
        rectLeft = left
        rectTop = top
    } else {
        //top and left offset relative to its parent
        rectLeft = elRect.left - parentRect.left
        rectTop = elRect.top - parentRect.top
        left += rectLeft
        top += rectTop
    }

    return {
        left,
        top,
        rectLeft,
        rectTop
    }
}

export function getHandlers(children: React.ReactElement, handler: Function) {
    const {
        onClick,
        onMouseEnter,
        onMouseLeave,
        onBlur,
        onFocus
    } = children.props

    return {
        hover: {
            onMouseEnter: chainFunction(handler, onMouseEnter),
            onMouseLeave: chainFunction(handler, onMouseLeave)
        },
        click: {
            onClick: chainFunction(handler, onClick)
        },
        focus: {
            onFocus: chainFunction(handler, onFocus),
            onBlur: chainFunction(handler, onBlur)
        }
    }
}