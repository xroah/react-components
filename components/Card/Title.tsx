import * as React from "react"
import {node, oneOf} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {isValidNode} from "../Commons/utils"
import {
    DivAttrs,
    TextColor,
    textColors
} from "../Commons/consts-and-types"
import {createComponent} from "reap-utils/lib/react"

interface CardTitleProps extends DivAttrs {
    subTitle?: React.ReactNode
    subTitleColor?: TextColor
}

export default createComponent<CardTitleProps>({
    displayName: "CardTitle",
    propTypes: {
        subTitle: node,
        subTitleColor: oneOf(textColors)
    },
    defaultProps: {
        subTitleColor: "muted"
    },
    render(
        className,
        {
            subTitleColor,
            subTitle,
            children,
            ...restProps
        }
    ) {
        const subClasses = classNames(
            "card-subtitle",
            subTitleColor && `text-${subTitleColor}`
        )

        return (
            <div className={className} {...restProps}>
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
})