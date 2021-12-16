import * as React from "react"
import {
    number,
    oneOf,
    oneOfType,
    shape
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Breakpoint, BreakpointType, DivAttrs} from "../Commons/consts-and-types"
import {
    forEachBreakpoint,
    getBreakpointClasses,
    getBreakpointPrefixFunc,
    getShape
} from "../Commons/utils"

type Cols = "auto" | number
type ColBreakpoint = BreakpointType<Breakpoint, Cols>
type GutterBreakpoint = BreakpointType<Breakpoint, number | GuttersObject>
type GuttersObject = {
    x?: number
    y?: number
}
type ColsType = Cols | ColBreakpoint
type GuttersType = number | GuttersObject | GutterBreakpoint

interface RowProps extends DivAttrs {
    cols?: ColsType
    gutters?: GuttersType
}

function handleGutters(
    gutters?: GuttersType,
    breakpoint?: Breakpoint
): string {
    if (!gutters) {
        return ""
    }

    const getClass = (
        gutter: number,
        prefix: string,
        bp?: Breakpoint
    ) => getBreakpointPrefixFunc(prefix, bp)(gutter)

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

    return forEachBreakpoint(
        gutters as GutterBreakpoint,
        handleGutters
    )
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
        shape(getShape(colTypes))
    ]),
    gutters: oneOfType([
        ...gutterTypes,
        shape(getShape(gutterTypes))
    ])
}