import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    variantType,
    variantArray, isUndef
} from "../utils"
import {
    colorType,
    color
} from "./CardTitle"
import {CommonProps} from "../Common/CommonPropsInterface"
import {CardBody} from "./Others"
import CardImage, {CardImageProps} from "./image"

export interface CardProps extends CommonProps<HTMLDivElement> {
    header?: React.ReactNode
    footer?: React.ReactNode
    headerStyle?: React.CSSProperties
    footerStyle?: React.CSSProperties
    body?: boolean
    image?: React.ReactElement<CardImageProps>
    isImgOverlay?: boolean
    alignment?: "left" | "center" | "right"
    bg?: variantType
    border?: variantType
    color?: colorType
}

export default function Card(props: CardProps) {
    const {
        header,
        footer,
        image,
        className,
        children,
        isImgOverlay,
        alignment,
        bg,
        color: colorProp,
        border,
        headerStyle,
        body,
        footerStyle,
        ...otherProps
    } = props
    let _children = (
        isImgOverlay && !!image ?
            (
                <div className="card-img-overlay">
                    {children}
                </div>
            )
            : body ?
                (
                    <CardBody>
                        {children}
                    </CardBody>
                )
                : children
    )

    if (image && image.type === CardImage) {
        const {props} = image

        if (props.position === "top") {
            _children = (
                <>
                    {image}
                    {_children}
                </>
            )
        }
        else {
            _children = (
                <>
                    {_children}
                    {image}
                </>
            )
        }
    }

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
            {_children}
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
    body: PropTypes.bool,
    image: PropTypes.element,
    isImgOverlay: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right"]),
    bg: PropTypes.oneOf(variantArray),
    border: PropTypes.oneOf(variantArray),
    color: PropTypes.oneOf(color)
}

Card.defaultProps = {
    imgPosition: "top",
    isImgOverlay: false,
    body: false
}
