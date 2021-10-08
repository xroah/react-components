import * as React from "react"
import {
    bool,
    element,
    number,
    oneOf
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    Alignment,
    alignments,
    TextColor,
    textColors,
    ValueOf
} from "../Commons/consts-and-types"

const fontWeights = [
    "bold",
    "bolder",
    "normal",
    "light",
    "lighter"
] as const
const fontStyles = [
    "italic",
    "normal"
] as const
const lineHeights = [
    "sm",
    "base",
    "lg"
] as const
const decorations = [
    "none",
    "underline",
    "line-through"
] as const
const spaces = [
    "wrap",
    "nowrap"
] as const

interface CardTextProps {
    children: React.ReactElement
    color?: TextColor
    size?: number
    weight?: ValueOf<typeof fontWeights>
    style?: ValueOf<typeof fontStyles>
    lineHeight?: ValueOf<typeof lineHeights> | 1
    alignment?: Alignment
    decoration?: ValueOf<typeof decorations>
    space?: ValueOf<typeof spaces>
    break?: boolean
}

export default function CardText(
    {
        children,
        color,
        size,
        weight,
        style,
        lineHeight,
        alignment,
        decoration,
        space,
        break: b
    }: CardTextProps
) {
    const c = React.Children.only(children)
    const classes = classNames(
        color && `text-${color}`,
        size && `fs-${size}`,
        weight && `fw-${weight}`,
        style && `fst-${style}`,
        lineHeight && `lh-${lineHeight}`,
        alignment && `text-${alignment}`,
        decoration && `text-${decoration}`,
        space && `text-${space}`,
        b && "text-break"
    )

    return React.cloneElement(c, {className: classes})
}

CardText.propTypes = {
    children: element,
    color: oneOf(textColors),
    size: number,
    weight: oneOf(fontWeights),
    style: oneOf(fontStyles),
    lineHeight: oneOf(lineHeights),
    alignment: oneOf(alignments),
    decoration: oneOf(decorations),
    space: oneOf(spaces),
    break: bool
}