// for avoid cycling reference
export function chainFunction(...fn: any[]) {
    return fn.reduce(
        (acc, cur) => (...args: unknown[]) => {
            acc.apply(null, args)

            if (typeof cur === "function") {
                cur.apply(null, args)
            }
        },
        noop
    )
}

export function isPlainObject(obj: unknown) {
    return Object.prototype.toString.call(obj) === "[object Object]"
}

export function isUndef(v: unknown) {
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

export function capitalize(v: string) {
    if (!v) {
        return v
    }

    let first = v[0].toUpperCase()

    return `${first}${v.substring(1)}`
}

export function camelCase(v: string, delimiter = "-") {
    if (!v) {
        return ""
    }

    return v.
        split(delimiter).
        map(capitalize).
        join("")
}