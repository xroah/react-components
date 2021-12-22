import * as React from "react"
import {omit} from "reap-utils/lib"
import classNames from "reap-utils/lib/class-names"
import {isValidNode} from "reap-utils/lib/react"
import {DivAttrs} from "../Commons/consts-and-types"

interface CarouselItemProps extends DivAttrs {
    caption?: React.ReactNode
    captionClass?: string
    interval?: number
}

export const PREFIX = "carousel"

const CarouselItem: React.FunctionComponent<CarouselItemProps> = (
    {
        className,
        caption,
        captionClass,
        children,
        ...restProps
    }
) => {
    const classes = classNames(
        className,
        `${PREFIX}-item`
    )

    return (
        <div
            className={classes}
            {...omit(restProps, "interval")}>
                {children}
                {
                    isValidNode(caption) && (
                        <div className={
                            classNames(
                                captionClass,
                                `${PREFIX}-caption`
                            )
                        }>
                            {caption}
                        </div>
                    )
                }
        </div>
    )
}

export default CarouselItem