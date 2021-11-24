import {isPlainObject} from "./main"

function _classNames(...args: any[]): string[] {
    const classes = []

    for (const arg of args) {
        if (arg || arg === 0) {
            const argType = typeof arg

            if (argType === "string" || argType === "number") {
                classes.push(arg.toString())
            } else if (Array.isArray(arg)) {
                classes.push(..._classNames(...arg))
            } else if (isPlainObject(arg)) {
                Object.keys(arg).forEach(a => {
                    if (arg[a]) {
                        classes.push(a)
                    }
                })
            } else if (argType === "function") {
                classes.push(..._classNames(arg()))
            }
        }
    }

    return classes
}

export default function classNames(...args: any[]) {
    return _classNames(args).join(" ")
}