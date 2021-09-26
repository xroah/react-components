import * as React from "react"
import {
    element,
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
} from "../Commons/consts-and-types"
import {getBreakpointClasses, getShape} from "../Commons/utils"

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

interface AlignmentProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactElement,
    vertical?: VBreakpoints | V
    horizontal?: HBreakpoints | H
    self?: SBreakpoints | S
    content?: CBreakpoints | C
}

export default function Alignment(
    {
        className,
        children,
        vertical,
        horizontal,
        self,
        content,
        ...restProps
    }: AlignmentProps
) {
    const _children = React.Children.only(children)
    const classes = classNames(
        className,
        children.props.className,
        vertical && getBreakpointClasses("align-items", vertical),
        horizontal && getBreakpointClasses("justify-content", horizontal),
        self && getBreakpointClasses("align-self", self),
        content && getBreakpointClasses("align-content", content)
    )

    return React.cloneElement(
        _children,
        {
            className: classes,
            ...restProps
        }
    )
}

function getType(v: readonly string[]) {
    const t = oneOf(v)

    return oneOfType([
        t,
        shape(getShape(t))
    ])
}

Alignment.propTypes = {
    children: element.isRequired,
    vertical: getType(vAlignments),
    horizontal: getType(hAlignments),
    self: getType(selfAlignments),
    content: getType(cAlignments)
}