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
    return (
        <p
            className={
                classNames(
                    className,
                    "card-text",
                    color && `text-${color}`
                )
            } {...restProps} />
    )
}

CardText.propTypes = {
    color: colorPropType
}