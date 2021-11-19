// for avoid cycling reference
export function chainFunction(...fn: Function[]) {
    return fn.reduce(
        (acc, cur) => (...args: any[]) => {
            acc.apply(null, args)

            if (typeof cur === "function") {
                cur.apply(null, args)
            }
        },
        noop
    )
}

export function isPlainObject(obj: any) {
    return Object.prototype.toString.call(obj) === "[object Object]"
}

export function isUndef(v: any) {
    return v === undefined || v === null
}

export function omit<T extends object, K extends keyof T>(
    obj: T,
    props: K[] | K
): Partial<T> {
    if (!Array.isArray(props)) {
        props = [props]
    }

    for (let prop of props) {
        if (prop in obj) {
            delete obj[prop]
        }
    }


    return obj
}

export function noop() {
    // do nothing
}