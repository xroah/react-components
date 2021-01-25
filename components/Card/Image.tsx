import React, {ReactElement} from "react"
import Image, {ImageProps} from "../Image"
import {classNames} from "../utils"
import PropTypes from "prop-types"

interface CardImageProps extends ImageProps {
    position: "top" | "bottom"
    img?: ReactElement
}

export default function CardImage(props: CardImageProps) {
    const {
        position,
        className,
        img,
        ...otherProps
    } = props
    const cls = `card-img-${position}`

    if (React.isValidElement(img)) {
        return React.cloneElement(
            img,
            {
                className: classNames(img.props.className, cls)
            }
        )
    }

    return (
        <Image
            className={classNames(className, cls)}
            {...otherProps} />
    )
}

CardImage.defaultProps = {
    position: "top"
}
CardImage.propTypes = {
    position: PropTypes.oneOf(["top", "bottom"])
}