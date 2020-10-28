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
import CardImage, {CardImageProps} from "./Image"
import warning from "warning"
import {CardContext} from "../Common/contexts"

export interface CardProps extends CommonProps<HTMLDivElement> {
    header?: React.ReactNode
    footer?: React.ReactNode
    headerStyle?: React.CSSProperties
    footerStyle?: React.CSSProperties
    body?: boolean
    image?: React.ReactElement<CardImageProps>
    imagePosition?: "top" | "bottom"
    imageOverlay?: boolean
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
        imageOverlay,
        imagePosition,
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
        imageOverlay && !!image ?
            (
                <div className="card-img-overlay">
                    {children}
                </div>
            ) :
            body ?
                <CardBody>{children}</CardBody> :
                children
    )
    let img: React.ReactElement<CardImageProps> | undefined

    if (image && image.type === CardImage) {
        img = image
    }

    warning(
        !(image && image.type !== CardImage),
        "The image prop is not a CardImage component, this will be rendered null"
    )

    return (
        <CardContext.Provider value={{imagePosition: imagePosition!}}>
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
                {
                    imagePosition === "bottom" ?
                        <>{_children}{img}</> :
                        <>{img}{_children}</>
                }
                {
                    !isUndef(footer) && (
                        <div style={footerStyle} className="card-footer">{footer}</div>
                    )
                }
            </div>
        </CardContext.Provider>
    )
}

Card.propTypes = {
    header: PropTypes.node,
    footer: PropTypes.node,
    headerStyle: PropTypes.object,
    footerStyle: PropTypes.object,
    body: PropTypes.bool,
    image: PropTypes.element,
    imageOverlay: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right"]),
    bg: PropTypes.oneOf(variantArray),
    border: PropTypes.oneOf(variantArray),
    color: PropTypes.oneOf(color)
}

Card.defaultProps = {
    imagePosition: "top",
    imageOverlay: false,
    body: false
}
