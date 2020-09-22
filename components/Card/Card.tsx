import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    variantType,
    variantArray, isUndef
} from "../utils"
import {colorType, color} from "./CardTitle"
import {CommonProps} from "../Common/CommonPropsInterface"
import {CardBody} from "./Others"

export interface CardProps extends CommonProps<HTMLDivElement> {
    header?: React.ReactNode
    footer?: React.ReactNode
    headerStyle?: React.CSSProperties
    footerStyle?: React.CSSProperties
    body?: boolean
    img?: React.ReactElement | string
    imgAlt?: string
    imgTitle?: string
    imgPosition?: "top" | "bottom"
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
        img,
        imgPosition,
        className,
        children,
        isImgOverlay,
        imgAlt,
        imgTitle,
        alignment,
        bg,
        color: colorProp,
        border,
        headerStyle,
        body,
        footerStyle,
        ...otherProps
    } = props

    let topImg
    let bottomImg

    if (img) {
        let _img: React.ReactElement
        const cls = `card-img-${imgPosition}`

        if (React.isValidElement(img)) {
            _img = React.cloneElement<any>(
                img,
                {
                    className: classNames((img.props as any).className, cls)
                }
            )
        }
        else {
            _img = 
                <img
                    className={cls}
                    src={img as string}
                    alt={imgAlt}
                    title={imgTitle} />
            
        }

        if (imgPosition === "top") {
            topImg = _img
        }
        else {
            bottomImg = _img
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
                !isUndef(header) && 
                    <div style={headerStyle} className="card-header">{header}</div>
                
            }
            {topImg}
            {
                isImgOverlay && !!img ? 
                    <div className="card-img-overlay">
                        {children}
                    </div>
                    : body ? 
                        <CardBody>
                            {children}
                        </CardBody>
                        : children
            }
            {bottomImg}
            {
                !isUndef(footer) && 
                    <div style={footerStyle} className="card-footer">{footer}</div>
                
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
    img: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    imgAlt: PropTypes.string,
    imgPosition: PropTypes.oneOf(["top", "bottom"]),
    isImgOverlay: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right"]),
    bg: PropTypes.oneOf(variantArray),
    border: PropTypes.oneOf(variantArray),
    color: PropTypes.oneOf(color),
}

Card.defaultProps = {
    imgPosition: "top",
    isImgOverlay: false,
    body: false
}
