import * as React from "react"
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
    ValueOf,
    CSSComponentProps
} from "../../Commons/consts-and-types"
import {
    cloneWithClass,
    getBreakpointClasses,
    getBreakpointShape
} from "../../Commons/utils"
import {cssCompPropTypes} from "../../Commons/prop-types"
import {only} from "reap-utils/lib/react"

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

interface AlignmentProps extends CSSComponentProps {
    vertical?: VBreakpoints | V
    horizontal?: HBreakpoints | H
    self?: SBreakpoints | S
    content?: CBreakpoints | C
    // for error hint of typescript
    // if children extend from super may not cause an error
    children: React.ReactElement
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
    const c = only(children)
    const classes = classNames(
        vertical && getBreakpointClasses("align-items", vertical),
        horizontal && getBreakpointClasses("justify-content", horizontal),
        self && getBreakpointClasses("align-self", self),
        content && getBreakpointClasses("align-content", content)
    )

    return cloneWithClass(c, className, classes)
}

function getType(v: readonly string[]) {
    return oneOfType([
        oneOf(v),
        shape(getBreakpointShape(v, false))
    ])
}

Alignment.propTypes = {
    ...cssCompPropTypes,
    vertical: getType(vAlignments),
    horizontal: getType(hAlignments),
    self: getType(selfAlignments),
    content: getType(cAlignments)
}