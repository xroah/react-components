import * as React from "react"
import {classNames} from "../utils"
import PropTypes from "prop-types"
import warning from "warning"
import {CardContext} from "../Common/contexts"

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    img?: React.ReactElement
}

export default function CardImage(props: CardImageProps) {
    const {
        className,
        src,
        img,
        ...otherProps
    } = props

    return (
        <CardContext.Consumer>
            {
                ({imagePosition}) => {
                    const classes = classNames(
                        className,
                        `card-img-${imagePosition}`
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
                            src={src}
                            className={classes}
                            {...otherProps} />
                    )
                }
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