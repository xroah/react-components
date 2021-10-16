import React, {
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

export function getBreakpointPrefixFunc(
    prefix: string,
    breakpoint?: Breakpoint
) {
    return getPrefixFunc(
        breakpoint && breakpoint !== "xs" ?
            `${prefix}-${breakpoint}` :
            prefix
    )
}

type BaseValue = string | number | boolean | object

export function forEachBreakpoint<T extends BaseValue>(
    v: BreakpointType<Breakpoint, T>,
    callback?: (v: T, bp: Breakpoint) => string | undefined
) {
    const keys = Object.keys(v) as Array<keyof typeof v>
    const classes: string[] = []

    keys.forEach(
        k => {
            let ret: string | undefined

            if (callback && (ret = callback(v[k] as T, k))) {
                classes.push(ret)
            }
        }
    )

    return classes.join(" ")
}

export function getBreakpointClasses<T extends BaseValue>(
    prefix: string,
    value?: BreakpointType<Breakpoint, T> | T,
    breakpoint?: Breakpoint
): string {
    if (!value) {
        return ""
    }

    const _prefix = getBreakpointPrefixFunc(prefix, breakpoint)
    const t = typeof value

    if (t === "number" || t === "string") {
        return _prefix(value as any)
    } else if (t === "boolean") {
        return _prefix()
    }

    return forEachBreakpoint(
        value as BreakpointType<Breakpoint, T>,
        (v, bp) => getBreakpointClasses(prefix, v, bp)
    )
}

export function getShape<T>(v: T) {
    let ret: BreakpointType<Breakpoint, T> = {}

    for (let bp of breakpoints) {
        ret[bp] = v
    }

    return ret
}

export function getClass(prefix: string, prop?: any) {
    if (!prop) {
        return ""
    }

    return `${prefix}-${prop}`
}

export function cloneWithClass(
    c: React.ReactElement,
    compClass?: string,
    handledClass?: string
) {
    return React.cloneElement(
        c,
        {
            className: classNames(
                c.props.className,
                compClass,
                handledClass
            )
        }
    )
}