import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {MediaContext} from "../Common/contexts"
import Image, {ImageProps} from "../Common/Image"

export interface MediaImageProps extends ImageProps {
    alignment?: "start" | "center" | "end"
}

export default function MediaImage(props: MediaImageProps) {
    const {
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
                        alignmentMap[alignment as string],
                        imagePosition === "right" ? "ml-3" : "mr-3"
                    )
                    
                    return (
                        <Image className={classes} {...otherProps}/>
                    )
                }
            }
        </MediaContext.Consumer>
    )
}

MediaImage.propTypes = {
    alignment: PropTypes.oneOf(["start", "center", "end"])
}
MediaImage.defaultProps = {
    size: 64
}