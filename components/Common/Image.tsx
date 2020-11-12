import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"
import warning from "warning"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    img?: React.ReactElement
    size?: number
    border?: "rounded" | "circle"
}

export default function Image(props: ImageProps) {
    const {
        img,
        border,
        size,
        className,
        ...otherProps
    } = props

    if (React.isValidElement(img)) {
        return img
    } else if (img) {
        warning(
            false,
            "img must be an element"
        )

        return null
    }

    const classes = classNames(
        className,
        border && (border === "rounded" ? "rounded" : "rounded-circle")
    )
    const _img = <img className={classes} {...otherProps} />

    return !isUndef(size) ?
        React.cloneElement(
            _img,
            {
                width: size,
                height: size
            }
        ) :
        _img

}

Image.propTypes = {
    border: PropTypes.oneOf(["border", "circle"]),
    size: PropTypes.number,
    img: PropTypes.element
}