import * as React from "react"
import {colorPropType} from "./Card"
import classNames from "reap-utils/lib/class-names"
import {TextColor} from "../Commons/consts-and-types"

interface CardTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: TextColor
}

export default function CardText(
    {
        className,
        color,
        ...restProps
    }: CardTextProps
) {
    const classes = classNames(
        className,
        "card-text",
        color && `text-${color}`
    )

    return <p className={classes} {...restProps} />
}

CardText.propTypes = {
    color: colorPropType
}