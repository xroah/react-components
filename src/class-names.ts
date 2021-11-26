import {isPlainObject} from "./main"

export default function classNames(...args: any[]) {
    const classes: string[] = []
    const push = (v: string) => {
        if (v) {
            classes.push(v)
        }
    }

    for (const arg of args) {
        if (arg || arg === 0) {
            const argType = typeof arg

            if (argType === "string" || argType === "number") {
                push(arg.toString())
            } else if (Array.isArray(arg)) {
                if (arg.length) {
                    push(classNames(...arg))
                }
            } else if (isPlainObject(arg)) {
                Object.keys(arg).forEach(key => {
                    if (arg[key]) {
                        push(key)
                    }
                })
            } else if (argType === "function") {
                push(classNames(arg()))
            }
        }
    }

    return classes.join(" ")
}