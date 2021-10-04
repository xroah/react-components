import * as React from "react"
import {
    element,
    number,
    oneOf
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
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

interface CardTextProps {
    children: React.ReactElement
    color?: TextColor
    size?: number
    weight?: ValueOf<typeof fontWeights>
    style?: ValueOf<typeof fontStyles>
}

export default function CardText(
    {
        children,
        color,
        size,
        weight,
        style
    }: CardTextProps
) {
    const c = React.Children.only(children)
    const classes = classNames(
        color && `text-${color}`,
        size && `fs-${size}`,
        weight && `fw-${weight}`,
        style && `fst-${style}`
    )

    return React.cloneElement(c, {className: classes})
}

CardText.propTypes = {
    children: element,
    color: oneOf(textColors),
    size: number,
    weight: oneOf(fontWeights),
    style: oneOf(fontStyles)
}