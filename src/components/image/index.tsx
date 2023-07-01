import React, { FC } from "react"
import { DivProps } from "../commons/types"
import { classnames } from "../utils"

interface ImageProps extends DivProps {
    rounded?: boolean
    thumbnail?: boolean
    width?: number | string
    height?: number | string
    preview?: boolean
    src?: string
    alt?: string
}

const Image: FC<ImageProps> = (
    {
        rounded,
        thumbnail,
        width,
        height,
        preview,
        style,
        src,
        alt,
        ...restProps
    }: ImageProps
) => {
    const imgClasses = classnames(
        thumbnail && "img-thumbnail",
        rounded && "rounded"
    )

    return (
        <div
            style={{
                ...style,
                width, 
                height
            }}
            {...restProps}>
            <img
                src={src}
                alt={alt}
                className={imgClasses}
                width={width}
                height={height} />
        </div>
    )
}

export default Image