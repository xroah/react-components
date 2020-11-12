import * as React from "react"
import {classNames} from "../utils"
import Image, {ImageProps} from "../Common/Image"
import PropTypes from "prop-types"
import {CardContext} from "../Common/contexts"

export default function CardImage(props: ImageProps) {
    const {
        className,
        ...otherProps
    } = props

    return (
        <CardContext.Consumer>
            {
                ({imagePosition}) => (
                    <Image className={
                        classNames(
                            className,
                            `card-img-${imagePosition}`
                        )
                    } {...otherProps} />
                )
            }
        </CardContext.Consumer>
    )
}

CardImage.defaultProps = {
    position: "top"
}
CardImage.propTypes = {
    position: PropTypes.oneOf(["top", "bottom"])
}