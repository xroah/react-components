export default function classNames(...args: any): string {
    const classes = []

    for (const arg of args) {
        if (!arg) {
            continue
        }

        const argType = typeof arg

        if (argType === "string") {
            classes.push(arg)
        }
        else if (Array.isArray(arg)) {
            const cls = classNames(...arg)
            cls && classes.push(cls)
        }
        else if (argType === "object") {
            Object.keys(arg).forEach(a => arg[a] && classes.push(a))
        }
    }

    return classes.join(" ")
}