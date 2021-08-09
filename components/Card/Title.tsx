import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Color, colorPropType} from "./Card"
import {isValidNode} from "../Commons/utils"

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    subTitle?: React.ReactNode
    subTitleColor?: Color
    color?: Color
}

export default function CardTitle(
    {
        subTitle,
        subTitleColor,
        color,
        children,
        ...restProps
    }: CardTitleProps
) {
    return (
        <div {...restProps}>
            <h5 className={
                classNames(
                    "card-title",
                    color && `text-${color}`
                )
            }>
                {children}
            </h5>
            {
                isValidNode(subTitle) && (
                    <h6 className={
                        classNames(
                            "card-title",
                            subTitleColor && `text-${subTitleColor}`
                        )
                    }>
                        {subTitle}
                    </h6>
                )
            }
        </div>
    )
}

CardTitle.propTypes = {
    color: colorPropType,
    subTitle: PropTypes.node,
    subTitleColor: PropTypes.node
}
CardTitle.defaultProps = {
    subTitleColor: "muted"
}