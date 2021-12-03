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

export function getWindowScrollBar() {
    const div = document.createElement("div")
    const ret = {
        x: 0,
        y: 0
    }
    div.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        z-index: -9999
    `

    document.body.appendChild(div)

    ret.x = window.innerWidth - div.clientWidth
    ret.y = window.innerHeight - div.clientHeight

    // document.body.removeChild(div)

    return ret
}