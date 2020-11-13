import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"
import {CommonPropsWithoutTitle} from "../Common/CommonPropsInterface"
export interface MediaProps extends CommonPropsWithoutTitle<HTMLDivElement> {
    title?: string | React.ReactNode
    image?: React.ReactElement
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
    let img = image

    if (React.isValidElement(image)) {
        img = React.cloneElement(
            image,
            {
                className: classNames(
                    image.props.className,
                    imagePosition === "right" ? "ml-3" : "mr-3"
                )
            }
        )
    }

    return (
        <div
            className={classNames(className, "media")}
            {...otherProps}>
            {
                imagePosition === "right" ?
                    <>{body}{img}</> :
                    <>{img}{body}</>
            }
        </div>
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