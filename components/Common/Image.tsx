import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: number
    border?: "rounded" | "circle"
}

export default function Image(props: ImageProps) {
    const {
        border,
        size,
        className,
        ...otherProps
    } = props

    const classes = classNames(
        className,
        border && (border === "rounded" ? "rounded" : "rounded-circle")
    )
    const img = <img className={classes} {...otherProps} />

    return !isUndef(size) ?
        React.cloneElement(
            img,
            {
                width: size,
                height: size
            }
        ) : img

}

Image.propTypes = {
    border: PropTypes.oneOf(["border", "circle"]),
    size: PropTypes.number
}