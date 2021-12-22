import {
    ReactElement,
    cloneElement,
    Children,
    ReactNode,
    isValidElement
} from "react"
import {oneOf, oneOfType} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    PrefixFunc,
    Breakpoint,
    BreakpointType,
    breakpoints
} from "./consts-and-types"

export function getPrefixFunc(prefix: string): PrefixFunc {
    return (s?: string | number) => (
        s || s === 0 ? `${prefix}-${s}` : prefix
    )
}

type BaseValue = string | number | boolean | object

export function forEachBreakpoint<T extends BaseValue>(
    v: BreakpointType<Breakpoint, T>,
    callback?: (v: T, bp: Breakpoint) => string | undefined
): string {
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

export function getBreakpointPrefixFunc(
    prefix: string,
    breakpoint?: Breakpoint,
    suffix?: string
) {
    const p = breakpoint !== undefined && breakpoint !== "xs" ?
        `${prefix}-${breakpoint}` :
        prefix

    return getPrefixFunc(suffix ? `${p}-${suffix}` : p)
}

export function getBreakpointClasses<T extends BaseValue>(
    prefix: string,
    value?: BreakpointType<Breakpoint, T> | T,
    breakpoint?: Breakpoint,
    suffix?: string
): string {
    if (value === undefined) {
        return ""
    }

    const _prefix = getBreakpointPrefixFunc(prefix, breakpoint, suffix)
    const t = typeof value

    if (t === "number" || t === "string") {
        return _prefix(value as any)
    } else if (t === "boolean") {
        return value ? _prefix() : ""
    }

    return forEachBreakpoint(
        value as BreakpointType<Breakpoint, T>,
        (v, bp) => getBreakpointClasses(prefix, v, bp, suffix)
    )
}

export function getBreakpointShape(v: any, type = true) {
    let ret: BreakpointType<Breakpoint, any> = {}

    for (let bp of breakpoints) {
        ret[bp] = Array.isArray(v) ?
            type ? oneOfType(v) : oneOf(v) : v
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
    c: ReactElement,
    compClass?: string,
    handledClass?: string
) {
    return cloneElement(
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

export function getProp<P, C>(prop?: P, ctx?: C): P | C | undefined {
    return prop === undefined ? ctx : prop
}

type Callback = (c: ReactElement, i: number) => ReactNode

export function map(
    children: ReactNode,
    callback?: Callback
) {
    return Children.map(
        children,
        (c, i) => {
            if (isValidElement(c) && callback) {
                return callback(c, i)
            }

            return c
        }
    )
}

