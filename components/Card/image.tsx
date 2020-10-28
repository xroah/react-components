import * as React from "react"
import {classNames} from "../utils"
import PropTypes from "prop-types"

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    position?: "top" | "bottom"
    img?: React.ReactNode
}

export default function CardImage(props: CardImageProps) {
    const {
        className,
        position,
        src,
        img,
        ...otherProps
    } = props
    const classes = classNames(
        className,
        `card-img-${position}`
    )

    if (src) {
        return <img
            src={src}
            className={classes}
            {...otherProps} />
    }

    if (React.isValidElement(img)) {
        return React.cloneElement(
            img, 
            {
                className: classes
            }
        )
    }

    return null
}

CardImage.defaultProps = {
    position: "top"
}
CardImage.propTypes = {
    position: PropTypes.oneOf(["top", "bottom"])
}