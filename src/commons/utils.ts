let zIndex = 1000

export function getZIndex() {
    zIndex += 1

    return zIndex
}

export function noop() {
    // do nothing
}

export function omit<T>(
    o: T,
    k: keyof T | Array<keyof T>
): Partial<T> {
    let keys: Array<keyof T> = []

    if (!Array.isArray(k)) {
        keys = [k]
    }

    for (const key of keys) {
        delete o[key]
    }

    return o
}