import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    variantType,
    variantArray,
    isUndef
} from "../utils"
import {
    colorType,
    color
} from "./CardTitle"
import {CommonProps} from "../Common/CommonPropsInterface"

export interface CardProps extends CommonProps<HTMLDivElement> {
    header?: React.ReactNode
    footer?: React.ReactNode
    headerStyle?: React.CSSProperties
    footerStyle?: React.CSSProperties
    alignment?: "left" | "center" | "right"
    bg?: variantType
    border?: variantType
    color?: colorType
}

export default function Card(props: CardProps) {
    const {
        header,
        footer,
        className,
        children,
        alignment,
        bg,
        color: colorProp,
        border,
        headerStyle,
        footerStyle,
        ...otherProps
    } = props

    return (
        <div className={
            classNames(
                className,
                "card",
                alignment && `text-${alignment}`,
                bg && `bg-${bg}`,
                border && `border-${border}`,
                colorProp && `text-${colorProp}`
            )
        } {...otherProps}>
            {
                !isUndef(header) && (
                    <div style={headerStyle} className="card-header">{header}</div>
                )
            }
            {children}
            {
                !isUndef(footer) && (
                    <div style={footerStyle} className="card-footer">{footer}</div>
                )
            }
        </div>
    )
}

Card.propTypes = {
    header: PropTypes.node,
    footer: PropTypes.node,
    headerStyle: PropTypes.object,
    footerStyle: PropTypes.object,
    alignment: PropTypes.oneOf(["left", "center", "right"]),
    bg: PropTypes.oneOf(variantArray),
    border: PropTypes.oneOf(variantArray),
    color: PropTypes.oneOf(color)
}
