import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: number
    border?: "rounded" | "circle" | "thumbnail"
    fluid?: boolean
}

export default function Image(props: ImageProps) {
    const {
        border,
        size,
        className,
        fluid,
        ...otherProps
    } = props

    const classes = classNames(
        className,
        border === "rounded" ? "rounded" :
            border === "circle" ? "rounded-circle" :
                border === "thumbnail" ? "img-thumbnail" : "",
        fluid && "img-fluid"
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
    border: PropTypes.oneOf(["border", "circle", "thumbnail"]),
    size: PropTypes.number,
    fluid: PropTypes.bool
}

Image.defaultProps = {
    fluid: false
}