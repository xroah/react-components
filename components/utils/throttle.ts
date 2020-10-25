export default (fn: Function, timeout: number = 100) => {
    let timer: any = null
    let previous = 0
    const throttled = function throttled() {
        const now = Date.now()
        const remaining = timeout - (now - previous)
        const args = Array.from(arguments)

        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }

            previous = now
            fn.apply(null, args)
        }
        else if (!timer) {
            timer = setTimeout(() => {
                timer = null
                fn.apply(null, args)
            }, timeout)
        }
    }

    return throttled
}