import React, {HTMLAttributes} from "react"
import {
    number,
    oneOf,
    oneOfType,
    shape
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Breakpoint, BreakpointType} from "../Commons/consts-and-types"
import {getBreakpointClasses, getShape} from "../Commons/utils"

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

function handleGutterBreakpoints(breakpoints: GutterBreakpoint) {
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
    const classes = classNames(
        className,
        "row",
        getBreakpointClasses("row-cols", cols),
        handleGutters(gutters)
    )

    return <div className={classes} {...restProps} />
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