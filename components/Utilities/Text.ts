import * as React from "react"
import {
    bool,
    number,
    oneOf
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    Alignment,
    alignments,
    TextColor,
    textColors,
    ValueOf,
    CSSComponentProps
} from "../Commons/consts-and-types"
import {cloneWithClass, getPrefixFunc} from "../Commons/utils"
import {cssCompPropTypes} from "../Commons/prop-types"
import {only} from "reap-utils/lib/react"

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
    1,
    "1",
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
const transforms = [
    "lowercase",
    "uppercase",
    "capitalize"
] as const

interface CardTextProps extends CSSComponentProps {
    color?: TextColor
    size?: number
    weight?: ValueOf<typeof fontWeights>
    style?: ValueOf<typeof fontStyles>
    lineHeight?: ValueOf<typeof lineHeights>
    alignment?: Alignment
    decoration?: ValueOf<typeof decorations>
    space?: ValueOf<typeof spaces>
    break?: boolean
    transform?: ValueOf<typeof transforms>
    truncate?: boolean
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
        break: b,
        transform,
        truncate,
        className
    }: CardTextProps
) {
    const c = only(children)
    const prefix = getPrefixFunc("text")
    const classes = classNames(
        color && prefix(color),
        size && `fs-${size}`,
        weight && `fw-${weight}`,
        style && `fst-${style}`,
        lineHeight && `lh-${lineHeight}`,
        alignment && prefix(alignment),
        decoration && `${prefix()}-decoration-${decoration}`,
        space && prefix(space),
        b && prefix("break"),
        transform && prefix(transform),
        truncate && prefix("truncate")
    )

    return cloneWithClass(c, className, classes)
}

CardText.propTypes = {
    ...cssCompPropTypes,
    color: oneOf(textColors),
    size: number,
    weight: oneOf(fontWeights),
    style: oneOf(fontStyles),
    lineHeight: oneOf(lineHeights),
    alignment: oneOf(alignments),
    decoration: oneOf(decorations),
    space: oneOf(spaces),
    break: bool,
    transforms: oneOf(transforms)
}