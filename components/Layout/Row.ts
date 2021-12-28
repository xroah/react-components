import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    Breakpoint,
    BreakpointType,
    DivAttrs
} from "../Commons/consts-and-types"
import {
    forEachBreakpoint,
    getBreakpointClasses,
    getBreakpointPrefixFunc,
    getBreakpointShape
} from "../Commons/utils"
import {createComponent} from "reap-utils/lib/react"

type Auto = "auto"
type Cols = Auto | number
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

const colTypes = [
    PropTypes.oneOf(["auto"] as Auto[]),
    PropTypes.number
]
const gutterTypes = [
    PropTypes.number,
    PropTypes.shape<any>({
        x: PropTypes.number,
        y: PropTypes.number
    })
]

export default createComponent<RowProps>({
    tag: "div",
    propTypes: {
        cols: PropTypes.oneOfType([
            ...colTypes,
            PropTypes.shape(getBreakpointShape(colTypes))
        ]),
        gutters: PropTypes.oneOfType([
            ...gutterTypes,
            PropTypes.shape(getBreakpointShape(gutterTypes))
        ])
    },
    propsHandler(
        {
            cols,
            gutters,
            ...restProps
        }
    ) {
        return {
            className: classNames(
                "row",
                getBreakpointClasses("row-cols", cols),
                handleGutters(gutters)
            ),
            newProps: restProps
        }
    }
})
