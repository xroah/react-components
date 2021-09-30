import * as React from "react"
import {Color, colorPropType} from "./Card"
import classNames from "reap-utils/lib/class-names"

interface CardTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: Color
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