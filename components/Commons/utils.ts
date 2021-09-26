import {
    createElement,
    ElementType,
    HTMLAttributes
} from "react"
import classNames from "reap-utils/lib/class-names"
import {
    PrefixFunc,
    Breakpoint,
    BreakpointType,
    breakpoints
} from "./consts-and-types"

export function getPrefixFunc(prefix: string): PrefixFunc {
    return (s?: string | number) => s ? `${prefix}-${s}` : prefix
}

export function isValidNode(node: any) {
    return node !== null &&
        node !== undefined &&
        typeof node !== "boolean"
}

interface CreateOptions {
    className?: string
    tag?: ElementType
    displayName?: string
}

export function createComponent<T extends HTMLAttributes<HTMLElement>>(
    {
        className,
        tag = "div",
        displayName
    }: CreateOptions,
) {
    const Component = ({
        className: c,
        ...restProps
    }: T) => {
        return createElement(
            tag,
            {
                className: classNames(className, c),
                ...restProps
            }
        )
    }

    if (displayName) {
        Component.displayName = displayName
    }

    return Component
}

export function getBreakpointClasses<T extends string | number | boolean>(
    prefix: string,
    value?: BreakpointType<Breakpoint, T> | T,
    breakpoint?: Breakpoint
) {
    if (!value) {
        return ""
    }

    const _prefix = getPrefixFunc(
        breakpoint && breakpoint !== "xs" ?
            `${prefix}-${breakpoint}` :
            prefix
    )
    const t = typeof value

    if (t === "number" || t === "string") {
        return _prefix(value as any)
    } else if (t === "boolean") {
        return _prefix()
    }

    const v = value as BreakpointType<Breakpoint, T>
    const keys = Object.keys(v) as Array<keyof typeof v>
    const classes: string[] = []

    keys.forEach(
        k => classes.push(
            getBreakpointClasses(prefix, v[k], k)
        )
    )

    return classes.join(" ")
}

export function getShape<T>(v: T) {
    let ret: BreakpointType<Breakpoint, T> = {}

    for (let bp of breakpoints) {
        ret[bp] = v
    }

    return ret
}