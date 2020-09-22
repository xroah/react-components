import * as React from "react"
import PropTypes from "prop-types"
import {
    variantType,
    classNames,
    variantArray,
    isUndef 
} from "../utils"
import {CommonProps} from "../Common/CommonPropsInterface"

export type colorType = variantType | "white" | "muted" | "white-50" | "black-50"

export interface CardTitleProps extends CommonProps<HTMLDivElement> {
    subtitle?: string
    subTitleColor?: colorType
    color?: colorType
}

export default function CardTitle(props: CardTitleProps) {
    const {
        subtitle,
        children,
        className,
        subTitleColor,
        color,
        ...otherProps
    } = props

    return (
        <div className={classNames(
            className,
            "card-title-wrapper"
        )} {...otherProps}>
            <h5 className={
                classNames(
                    "card-title",
                    color && `text-${color}`
                )
            }>{children}</h5>
            {
                !isUndef(subtitle) && (
                    <h6 className={`card-subtitle mb-2 text-${subTitleColor}`}>
                        {subtitle}
                    </h6>
                )
            }
        </div>
    )
}

export const color = [...variantArray, "white", "muted", "white-50", "black-50"]

CardTitle.propTypes = {
    color: PropTypes.oneOf(color),
    subtitle: PropTypes.string,
    subTitleColor: PropTypes.oneOf(color)
}
CardTitle.defaultProps = {
    subTitleColor: "muted"
}