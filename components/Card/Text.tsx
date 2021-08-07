import * as React from "react"
import {Color} from "./Card"
import classNames from "reap-utils/lib/class-names"

interface CardTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    color?: Color
}

export default function Text(
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
                color && `text-${color}`
            )
        } {...restProps}/>
    )
}