import {isPlainObject} from "./main"

export interface Options {
    leading?: boolean
    trailing?: boolean
}

export default (
    fn: Function,
    delay: number = 100,
    options: Options = {}
) => {
    if (!isPlainObject(options)) {
        options = {}
    }

    let timer: number | null = null
    let previous = 0
    let result: any
    const {trailing, leading} = options
    const throttled = (...args: unknown[]) => {
        const now = Date.now()

        if (!previous && leading === false) {
            previous = now
        }

        const remaining = delay - (now - previous)

        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }

            previous = now
            result = fn(args)
        } else if (!timer) {
            timer = window.setTimeout(
                () => {
                    previous = leading === false ? 0 : Date.now()
                    timer = null

                    if (trailing !== false) {
                        result = fn.apply(args)
                    }
                },
                remaining
            )
        }

        return result
    }

    return throttled
}