import { Root } from "react-dom/client"

export function noop() {
    // do nothing
}

export function isPlainObject(o: unknown) {
    return Object.prototype.toString.call(o) === "[object Object]"
}

export function omit<T>(
    o: T,
    k: keyof T | Array<keyof T>
): Partial<T> {
    if (!isPlainObject(o)) {
        return o
    }

    let keys: Array<keyof T> = []

    if (!Array.isArray(k)) {
        keys = [k]
    }

    for (const key of keys) {
        delete o[key]
    }

    return o
}

export function classnames(...classes: unknown[]): string {
    return classes
        .filter(c => !!c)
        .map(c => String(c).trim())
        .join(" ")
}

export function callAsync(callback: VoidFunction) {
    return Promise.resolve().then(callback)
}

/**
 * To avoid React Warning: Attempted to synchronously unmount a root 
 * while React was already rendering. React cannot finish unmounting 
 * the root until the current render has completed,
 * which may lead to a race condition.
 */
export function unmountAsync(root: Root, callback?: VoidFunction) {
    const unmount = () => {
        root.unmount()
        callback?.()
    }

   return callAsync(unmount)
}