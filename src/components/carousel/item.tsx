import React, { FC, ReactNode, useContext } from "react"
import {DivProps} from "../commons/types"
import { classnames, omit } from "../utils"
import CarouselContext from "./context"

interface CarouselItemProps extends DivProps {
    interval?: number
    caption?: ReactNode
}

export const PREFIX = "carousel"

const Item: FC<CarouselItemProps> = (
    {
        className,
        children,
        caption,
        ...restProps
    }: CarouselItemProps
) => {
    const classes = classnames(
        className,
        `${PREFIX}-item`
    )
    const ctx = useContext(CarouselContext)

    omit(restProps, "interval")

    return (
        <div className={classes} {...restProps}>
            {children}
            <div className={`${PREFIX}-caption`}>
                {caption}
            </div>
        </div>
    )
}

export default Item