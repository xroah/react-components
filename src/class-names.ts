import isPlainObject from "./is-plain-object"

export default function classNames(...args: any): string {
    const classes = []

    for (const arg of args) {
        if (!arg) {
            continue
        }

        const argType = typeof arg

        if (argType === "string") {
            classes.push(arg)
        } else if (Array.isArray(arg)) {
            classes.push(classNames(...arg))
        } else if (isPlainObject(arg)) {
            Object.keys(arg).forEach(
                a => {
                    const v = arg[a]

                    if (v) {
                        classes.push(classNames(v))
                    }
                }
            )
        } else if (argType === "function") {
            classes.push(classNames(arg()))
        }
    }

    return classes.join(" ")
}