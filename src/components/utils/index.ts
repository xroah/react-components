import { Root } from "react-dom/client"

export function noop() {
    // do nothing
}

export function isPlainObject(o: unknown) {
    return Object.prototype.toString.call(o) === "[object Object]"
}

export function omit<T extends object>(
    o: T,
    k: keyof T | Array<keyof T>
): Partial<T> {
    if (!isPlainObject(o)) {
        return o
    }

    let keys: Array<keyof T> = []

    if (!Array.isArray(k)) {
        keys = [k]
    } else {
        keys = k
    }

    for (const key of keys) {
        delete o[key]
    }

    return o
}

export function classnames(...classes: unknown[]): string {
    return classes.filter(c => !!c).join(" ").trim()
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

export function getDynamicWrapper(
    wrapper: HTMLElement | null,
    className?: string | string[],
    container: HTMLElement = document.body
): HTMLElement {
    let ret = wrapper

    if (!ret) {
        ret = document.createElement("div")

        if (className) {
            const _className = Array.isArray(className) ? className : [className]

            ret.classList.add(..._className)
        }
    }

    if (!ret.parentElement) {
        container.appendChild(ret)
    }

    return ret
}

type ClosedObject = {
    closed?: boolean
}

// wrap the close function for messages,loading etc
// in case of calling the function multiple times
export function wrapCloseFunc(
    close: VoidFunction,
    o?: ClosedObject
) {
    let closed = false

    return () => {
        if (closed) {
            return
        }

        closed = true

        if (o) {
            o.closed = closed
        }

        close()
    }
}

type Func = (...args: unknown[]) => unknown

export function chainFunction(
    ...fns: Array<Func | undefined | null>
): Func {
    if (!fns.length) {
        return noop
    }

    return fns.reduce(
        (acc, current) => {
            return (...args: unknown[]) => {
                acc?.(...args)
                current?.(...args)
            }
        }
    ) as Func
}

export function pick<T extends object>(
    o: T,
    keys: keyof T | Array<keyof T>
): Partial<T> {
    const ret: Partial<T> = {}
    let _keys: Array<keyof T> = []

    if (!Array.isArray(keys)) {
        _keys = [keys]
    } else {
        _keys = keys
    }

    for (const k of _keys) {
        ret[k] = o[k]
    }

    return ret
}

export function isUndef(o: unknown) {
    return o === null || o === undefined
}

export function getKeys(keys: string | string[]) {
    return new Set(
        Array.isArray(keys) ? keys : [keys]
    )
}

export function removeNode(
    node: HTMLElement | null,
    onRemove?: VoidFunction
) {
    if (!node || !node.parentElement) {
        return
    }

    if (!node.children.length) {
        node.remove()
        onRemove?.()
    }
}

let uuid = 0

export function generateKey() {
    return `r-key-${uuid++}`
}

export function getRealDir(p: string) {
    const placementMap = new Map([
        ["right", "end"],
        ["left", "start"],
        ["top", "top"],
        ["bottom", "bottom"]
    ])

    if (placementMap.has(p)) {
        return placementMap.get(p)
    }

    return ""
}