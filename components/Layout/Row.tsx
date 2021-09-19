import React, {HTMLAttributes} from "react"
import { } from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {breakpoints, ValueOf} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"

type Cols = "auto" | number
type Breakpoint = ValueOf<typeof breakpoints>
type ColBreakpoint = Record<Breakpoint, Cols>
type GuttersObject = {
    x?: number
    y?: number
}
type GutterBreakpoint = Record<Breakpoint, number | GuttersObject>

interface RowProps extends HTMLAttributes<HTMLDivElement> {
    cols?: Cols
    colBreakpoints?: ColBreakpoint
    gutters?: number | GuttersObject
    gutterBreakpoints?: GutterBreakpoint
}

function handleCols(
    prefix: string,
    cols?: Cols,
    breakpoint?: Breakpoint
) {
    if (!cols) {
        return ""
    }

    const _prefix = getPrefixFunc(`${prefix}-cols`)

    return breakpoint ? _prefix(`${breakpoint}-${cols}`) : _prefix(cols)
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

    for (let key of keys) {
        const v = breakpoints[key]

        classes.push(handleCols(prefix, v, key))
    }

    return classes.join(" ")
}

function handleGutters(
    gutters?: number | GuttersObject,
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

    if (typeof gutters.x !== "undefined") {
        return getClass(gutters.x, "gx", breakpoint)
    } else if (typeof gutters.y !== "undefined") {
        return getClass(gutters.y, "gy", breakpoint)
    }
}

function handleGutterBreakpoints(breakpoints?: GutterBreakpoint) {
    if (!breakpoints) {
        return ""
    }

    const classes: string[] = []
    const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>

    for (let key of keys) {
        const c = handleGutters(breakpoints[key], key)

        if (c) {
            classes.push(c)
        }
    }

    return classes.join(" ")
}

export default function Row(
    {
        className,
        cols,
        colBreakpoints,
        gutters,
        gutterBreakpoints,
        ...restProps
    }: RowProps
) {
    const prefix = getPrefixFunc("row")
    const p = prefix()
    const classes = classNames(
        className,
        p,
        handleCols(p, cols),
        handleColBreakpoints(p, colBreakpoints),
        handleGutters(gutters),
        handleGutterBreakpoints(gutterBreakpoints)
    )

    return <div className={classes} {...restProps} />
}