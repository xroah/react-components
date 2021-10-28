import {
    bool,
    oneOf,
    oneOfType,
    shape
} from "prop-types"
import {
    Breakpoint,
    BreakpointType,
    ValueOf
} from "../../Commons/consts-and-types"
import {CSSComponentProps} from "../../Commons/CommonPropsInterface"
import {
    cloneWithClass,
    forEachBreakpoint,
    getBreakpointClasses,
    getBreakpointPrefixFunc,
    getPrefixFunc,
    getShape,
    onlyChild
} from "../../Commons/utils"
import classNames from "reap-utils/lib/class-names"
import {cssCompPropTypes} from "../../Commons/prop-types"

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
    inline?: boolean | BreakpointType<Breakpoint, boolean>
    wrap?: Wrap | BreakpointType<Breakpoint, Wrap>
    direction?: Direction | BreakpointType<Breakpoint, Direction>
}

export default function Flex(
    {
        className,
        children,
        inline,
        wrap,
        direction
    }: FlexProps
) {
    const c = onlyChild(children)
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
        getBreakpointClasses(FLEX, wrap)
    )

    return cloneWithClass(c, className, classes)
}

const wrapType = oneOf(wraps)
const dType = oneOf(directions)

Flex.propTypes = {
    ...cssCompPropTypes,
    inline: oneOfType([
        bool,
        shape(getShape(bool))
    ]),
    wrap: oneOfType([
        wrapType,
        shape(getShape(wrapType))
    ]),
    directions: oneOfType([
        dType,
        shape(getShape(dType))
    ])
}

