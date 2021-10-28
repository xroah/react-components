import {
    oneOf,
    oneOfType,
    shape
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    alignments,
    BreakpointType,
    Breakpoint,
    ValueOf
} from "../../Commons/consts-and-types"
import {
    cloneWithClass,
    getBreakpointClasses,
    getShape,
    onlyChild
} from "../../Commons/utils"
import {CSSComponentProps} from "@commons/CommonPropsInterface"
import {cssCompPropTypes} from "@commons/prop-types"

const commons = [
    "between",
    "around",
] as const
const vAlignments = [
    ...alignments,
    "baseline",
    "stretch"
] as const
const hAlignments = [
    ...alignments,
    ...commons,
    "evenly"
] as const
const selfAlignments = [
    ...vAlignments,
    "auto"
] as const
const cAlignments = [
    ...alignments,
    ...commons,
    "stretch"
] as const

type V = ValueOf<typeof vAlignments>
type VBreakpoints = BreakpointType<Breakpoint, V>
type H = ValueOf<typeof hAlignments>
type HBreakpoints = BreakpointType<Breakpoint, H>
type S = ValueOf<typeof selfAlignments>
type SBreakpoints = BreakpointType<Breakpoint, S>
type C = ValueOf<typeof cAlignments>
type CBreakpoints = BreakpointType<Breakpoint, C>

interface AlignmentProps extends CSSComponentProps{
    vertical?: VBreakpoints | V
    horizontal?: HBreakpoints | H
    self?: SBreakpoints | S
    content?: CBreakpoints | C
}

export default function Alignment(
    {
        children,
        vertical,
        horizontal,
        self,
        className,
        content
    }: AlignmentProps
) {
    const c = onlyChild(children)
    const classes = classNames(
        vertical && getBreakpointClasses("align-items", vertical),
        horizontal && getBreakpointClasses("justify-content", horizontal),
        self && getBreakpointClasses("align-self", self),
        content && getBreakpointClasses("align-content", content)
    )

    return cloneWithClass(c, className, classes)
}

function getType(v: readonly string[]) {
    const t = oneOf(v)

    return oneOfType([
        t,
        shape(getShape(t))
    ])
}

Alignment.propTypes = {
    ...cssCompPropTypes,
    vertical: getType(vAlignments),
    horizontal: getType(hAlignments),
    self: getType(selfAlignments),
    content: getType(cAlignments)
}