import { isPlainObject } from "./main"

export default function classNames(...args: any[]): string {
    const classes = []

    for (const arg of args) {
        if (!arg && arg !== 0) {
            continue
        }

        const argType = typeof arg

        if (argType === "string" || argType === "number") {
            classes.push(arg.toString())
        } else if (Array.isArray(arg)) {
            classes.push(...classNames(...arg))
        } else if (isPlainObject(arg)) {
            Object.keys(arg).forEach(
                a => {
                    const v = arg[a]

                    if (v) {
                        classes.push(...classNames(a))
                    }
                }
            )
        } else if (argType === "function") {
            classes.push(...classNames(arg()))
        }
    }

    return classes.join(" ")
}