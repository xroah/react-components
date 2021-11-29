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
