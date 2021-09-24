import React, {HTMLAttributes} from "react"
import {
    number,
    oneOf,
    oneOfType,
    shape
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    breakpoints,
    Breakpoint,
    BreakpointType
} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"

type Cols = "auto" | number
type ColBreakpoint = BreakpointType<Breakpoint, Cols>
type GutterBreakpoint = BreakpointType<Breakpoint, number | GuttersObject>
type GuttersObject = {
    x?: number
    y?: number
}
type ColsType = Cols | ColBreakpoint
type GuttersType = number | GuttersObject | GutterBreakpoint

interface RowProps extends HTMLAttributes<HTMLDivElement> {
    cols?: ColsType
    gutters?: GuttersType
}

function handleCols(
    prefix: string,
    cols?: ColsType,
    breakpoint?: Breakpoint
) {
    if (!cols) {
        return ""
    }

    const _prefix = getPrefixFunc(`${prefix}-cols`)

    if (typeof cols === "object") {
        return handleColBreakpoints(prefix, cols)
    }

    return breakpoint ?
        _prefix(`${breakpoint}-${cols}`) :
        _prefix(cols)
}

function handleColBreakpoints(
    prefix: string,
    breakpoints?: ColBreakpoint
) {
    if (!breakpoints) {
        return ""
    }

    const classes: string[] = []
    const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>

    keys.forEach(k => {
        const v = breakpoints[k]

        classes.push(handleCols(prefix, v, k))
    })

    return classes.join(" ")
}

function handleGutters(
    gutters?: GuttersType,
    breakpoint?: Breakpoint
) {
    if (!gutters) {
        return ""
    }

    const getClass = (
        gutter: number,
        prefix: string,
        bp?: Breakpoint
    ) => {
        const classes = [prefix, bp, gutter]

        if (!bp) {
            classes.splice(1, 1)
        }

        return classes.join("-")
    }

    if (typeof gutters === "number") {
        return getClass(gutters, "g", breakpoint)
    }

    if ("x" in gutters || "y" in gutters) {
        const gutterClasses = []

        if (typeof gutters.x !== "undefined") {
            gutterClasses.push(getClass(gutters.x, "gx", breakpoint))
        }

        if (typeof gutters.y !== "undefined") {
            gutterClasses.push(getClass(gutters.y, "gy", breakpoint))
        }

        return gutterClasses.join(" ")
    }


    return handleGutterBreakpoints(gutters as GutterBreakpoint)
}

function handleGutterBreakpoints(breakpoints?: GutterBreakpoint) {
    if (!breakpoints) {
        return ""
    }

    const classes: string[] = []
    const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>

    keys.forEach(k => classes.push(handleGutters(breakpoints[k], k)))

    return classes.join(" ")
}

export default function Row(
    {
        className,
        cols,
        gutters,
        ...restProps
    }: RowProps
) {
    const prefix = getPrefixFunc("row")
    const p = prefix()
    const classes = classNames(
        className,
        p,
        handleCols(p, cols),
        handleGutters(gutters)
    )

    return <div className={classes} {...restProps} />
}

function getShape<T>(v: T) {
    let ret: BreakpointType<Breakpoint, T> = {}

    for (let bp of breakpoints) {
        ret[bp] = v
    }

    return ret
}

const colTypes = [
    oneOf(["auto"]),
    number
]
const gutterTypes = [
    number,
    shape({
        x: number,
        y: number
    })
]

Row.propTypes = {
    cols: oneOfType([
        ...colTypes,
        shape(getShape(oneOfType(colTypes)))
    ]),
    gutters: oneOfType([
        ...gutterTypes,
        shape(getShape(oneOfType(gutterTypes)))
    ])
}