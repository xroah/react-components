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
        return null
    }

    let container: HTMLElement | null = null

    if (typeof mountNode === "string") {
        container = document.querySelector(mountNode) as HTMLElement
    } else if (mountNode.nodeType) {
        container = mountNode
    }

    return container
}

export function getScrollbarSize(el: HTMLElement) {
    return {
        v: el.offsetWidth - el.clientWidth,
        h: el.offsetHeight - el.clientHeight
    }
}

export function getBorderSize(el: HTMLElement) {
    const styles = getComputedStyle(el)

    return {
        borderTop: parseFloat(styles.borderTopWidth),
        borderRight: parseFloat(styles.borderRightWidth),
        borderBottom: parseFloat(styles.borderBottomWidth),
        borderLeft: parseFloat(styles.borderLeftWidth)
    }
}

// getBoundingClientRect and exclude borders and scrollbars
export function getRealBoundary(el: HTMLElement) {
    const {h, v} = getScrollbarSize(el)
    const {
        borderTop,
        borderRight,
        borderBottom,
        borderLeft
    } = getBorderSize(el)
    const rect = el.getBoundingClientRect()

    return {
        top: rect.top + borderTop,
        right: rect.right - v - borderRight,
        bottom: rect.bottom - h - borderBottom,
        left: rect.left + borderLeft
    }
}