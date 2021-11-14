import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {isValidNode} from "../Commons/utils"
import {TextColor} from "@commons/consts-and-types"

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    subTitle?: React.ReactNode
    subTitleColor?: TextColor
}

export default function CardTitle(
    {
        subTitle,
        subTitleColor,
        children,
        ...restProps
    }: CardTitleProps
) {
    const subClasses = classNames(
        "card-subtitle",
        subTitleColor && `text-${subTitleColor}`
    )

    return (
        <div {...restProps}>
            <h5 className="card-title">
                {children}
            </h5>
            {
                isValidNode(subTitle) && (
                    <h6 className={subClasses}>
                        {subTitle}
                    </h6>
                )
            }
        </div>
    )
}

CardTitle.propTypes = {
    subTitle: PropTypes.node,
    subTitleColor: PropTypes.node
}
CardTitle.defaultProps = {
    subTitleColor: "muted"
}