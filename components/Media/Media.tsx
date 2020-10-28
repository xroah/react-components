import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"
import {CommonPropsWithoutTitle} from "../Common/CommonPropsInterface"
import MediaImage, {MediaImageProps} from "./Image"
import {MediaContext} from "../Common/contexts"
import warning from "warning"
export interface MediaProps extends CommonPropsWithoutTitle<HTMLDivElement> {
    title?: string | React.ReactNode
    image?: React.ReactElement<MediaImageProps>
    imagePosition?: "left" | "right"
}

export default function Media(props: MediaProps) {
    const {
        title,
        className,
        children,
        image,
        imagePosition,
        ...otherProps
    } = props
    const body = (
        <div className="media-body">
            {
                !isUndef(title) && (
                    <h5 className="mt-0 mb-1">{title}</h5>
                )
            }
            {children}
        </div>
    )
    let img: React.ReactElement<MediaImageProps> | undefined

    if (image && image.type === MediaImage) {
        img = image
    }
    
    warning(
        !(image && image.type !== MediaImage),
        "The image prop is not a MediaImage component, this will be rendered null"
    )

    return (
        <MediaContext.Provider value={{imagePosition: imagePosition!}}>
            <div
                className={classNames(className, "media")}
                {...otherProps}>
                {
                    imagePosition === "right" ?
                        <>{body}{img}</> :
                        <>{img}{body}</>
                }
            </div>
        </MediaContext.Provider>
    )
}

Media.defaultProps = {
    imagePosition: "left"
}
Media.propTypes = {
    title: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    image: PropTypes.element,
    imgPosition: PropTypes.oneOf(["left", "right"])
}