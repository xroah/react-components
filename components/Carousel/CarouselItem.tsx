import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"
import {CommonProps} from "../Common/CommonPropsInterface"

export interface ItemProps extends CommonProps<HTMLDivElement> {
    caption?: React.ReactNode
}

export default function CarouselItem(props: ItemProps) {
    const {
        caption,
        className,
        children,
        ...otherProps
    } = props

    return (
        <div className={
            classNames(
                className,
                "carousel-item"
            )
        }
        {...otherProps}>
            {children}
            {
                !isUndef(caption) && (
                    <div className="carousel-caption">
                        {caption}
                    </div>
                )
            }
        </div>
    )
}

CarouselItem.propTypes = {
    caption: PropTypes.node
}