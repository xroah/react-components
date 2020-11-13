import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
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
    const alignmentMap: any = {
        start: "align-self-start",
        center: "align-self-center",
        end: "align-self-end"
    }

    return (
        <Image className={
            classNames(
                className,
                alignmentMap[alignment as string]
            )
        } {...otherProps} />
    )
}

MediaImage.propTypes = {
    alignment: PropTypes.oneOf(["start", "center", "end"])
}
MediaImage.defaultProps = {
    size: 64
}