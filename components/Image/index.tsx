import {bool} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fluid?: boolean
    thumbnail?: boolean
    rounded?: boolean
}

export default function Image(
    {
        className,
        fluid,
        thumbnail,
        rounded,
        ...restProps
    }: ImageProps
) {
    const classes = classNames(
        classNames,
        fluid && "img-fluid",
        thumbnail && "img-thumbnail",
        rounded && "rounded"
    )

    return <img className={classes} {...restProps} />
}

Image.propTypes = {
    fluid: bool,
    thumbnail: bool,
    rounded: bool
}