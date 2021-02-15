import isPlainObject from "./is-plain-object"

export interface Options {
    trailing?: boolean
}

export default (fn: Function, delay: number = 100, options: Options = {}) => {
    if (!isPlainObject(options)) {
        options = {}
    }

    let timer: any = null
    let previous = 0
    const {trailing} = options
    const throttled = (...args: any[]) => {
        const now = Date.now()
        const remaining = delay - (now - previous)

        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }

            previous = now
            fn.apply(null, args)
        } else if (!timer && trailing !== false) {
            timer = setTimeout(() => {
                timer = null
                fn.apply(null, args)
            }, delay)
        }
    }

    return throttled
}