export interface DelayObject {
    show?: number
    hide?: number
}

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