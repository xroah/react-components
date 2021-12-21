import * as React from "react"
import {
    bool,
    number,
    oneOf,
    oneOfType,
    shape
} from "prop-types"
import {
    Breakpoint,
    BreakpointType,
    ValueOf,
    CSSComponentProps
} from "../../Commons/consts-and-types"
import {
    cloneWithClass,
    forEachBreakpoint,
    getBreakpointClasses,
    getBreakpointPrefixFunc,
    getPrefixFunc,
    getBreakpointShape
} from "../../Commons/utils"
import classNames from "reap-utils/lib/class-names"
import {cssCompPropTypes} from "../../Commons/prop-types"
import {only} from "reap-utils/lib/react"

const directions = [
    "row",
    "row-reverse",
    "column",
    "column reverse"
] as const
const wraps = [
    "wrap",
    "nowrap",
    "wrap-reverse"
] as const

type Wrap = ValueOf<typeof wraps>
type Direction = ValueOf<typeof directions>
type Inline = boolean | BreakpointType<Breakpoint, boolean>

interface FlexProps extends CSSComponentProps {
    gap?: number | BreakpointType<Breakpoint, number>
    inline?: boolean | BreakpointType<Breakpoint, boolean>
    wrap?: Wrap | BreakpointType<Breakpoint, Wrap>
    direction?: Direction | BreakpointType<Breakpoint, Direction>
    children: React.ReactElement
}

export default function Flex(
    {
        className,
        children,
        inline,
        wrap,
        direction,
        gap
    }: FlexProps
) {
    const c = only(children)
    const FLEX = "flex"
    const handleInline = (inline?: Inline): string => {
        const prefix = getPrefixFunc("d")
        const I_FLEX = `inline-${FLEX}`
        const t = typeof inline
        const getClass = (t: boolean, bp?: Breakpoint) => {
            const p = getBreakpointPrefixFunc(prefix(), bp)

            return p(t ? I_FLEX : FLEX)
        }

        if (t === "undefined") {
            return prefix(FLEX)
        }

        if (t === "boolean") {
            return getClass(t as any)
        }

        return forEachBreakpoint(
            inline as BreakpointType<Breakpoint, boolean>,
            getClass
        )
    }
    const classes = classNames(
        handleInline(inline),
        getBreakpointClasses(FLEX, direction),
        getBreakpointClasses(FLEX, wrap),
        getBreakpointClasses("gap", gap)
    )

    return cloneWithClass(c, className, classes)
}

const wrapType = oneOf(wraps)
const dType = oneOf(directions)

Flex.propTypes = {
    ...cssCompPropTypes,
    inline: oneOfType([
        bool,
        shape(getBreakpointShape(bool))
    ]),
    wrap: oneOfType([
        wrapType,
        shape(getBreakpointShape(wrapType))
    ]),
    directions: oneOfType([
        dType,
        shape(getBreakpointShape(dType))
    ]),
    gap: oneOfType([
        number,
        shape(getBreakpointShape(number))
    ])
}
