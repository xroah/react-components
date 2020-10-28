import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {MediaContext} from "../Common/contexts"

export interface MediaImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    border?: "rounded" | "circle"
    size?: number
    img?: React.ReactElement
    alignment?: "start" | "center" | "end"
}

export default function MediaImage(props: MediaImageProps) {
    const {
        border,
        size,
        img,
        alignment,
        className,
        ...otherProps
    } = props

    return (
        <MediaContext.Consumer>
            {
                ({imagePosition}) => {
                    const alignmentMap: any = {
                        start: "align-self-start",
                        center: "align-self-center",
                        end: "align-self-end"
                    }
                    const classes = classNames(
                        className,
                        border && (border === "rounded" ? "rounded" : "rounded-circle"),
                        alignmentMap[alignment as string],
                        imagePosition === "right" ? "ml-3" : "mr-3"
                    )

                    if (React.isValidElement(img)) {
                        return React.cloneElement(
                            img,
                            {
                                className: classes
                            }
                        )
                    }

                    return (
                        <img
                            width={size}
                            height={size}
                            className={classes}
                            {...otherProps} />
                    )
                }
            }
        </MediaContext.Consumer>
    )
}

MediaImage.propTypes = {
    border: PropTypes.oneOf(["border", "circle"]),
    size: PropTypes.number,
    img: PropTypes.element,
    alignment: PropTypes.oneOf(["start", "center", "end"])
}
MediaImage.defaultProps = {
    size: 64
}