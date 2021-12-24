import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {CarouselItemProps} from "../Carousel/types"
import {ITEM_PREFIX} from "../Carousel/constants"
import {ACTIVE_CLASS, StatusProps} from "../Commons/consts-and-types"
import {omit} from "reap-utils/lib"
import {getCaption} from "../Carousel/Item"

type NewProps = CarouselItemProps & Omit<StatusProps, "disabled">

const CarouselItem: React.FunctionComponent<NewProps> = (
    {
        children,
        caption,
        captionClass,
        active,
        className,
        style = {},
        ...restProps
    }
) => {
    const classes = classNames(
        className,
        ITEM_PREFIX,
        active && ACTIVE_CLASS
    )
    style.display = "block"
    style.flexShrink = 0
    style.float = "none"
    style.marginRight = "0"

    return (
        <div
            style={style}
            className={classes}
            {...omit(restProps, "interval")}>
            {children}
            {getCaption(caption, captionClass)}
        </div>
    )
}

export default CarouselItem