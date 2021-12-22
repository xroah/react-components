import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    DivAttrs,
    ValueOf,
    variants
} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {isValidNode} from "reap-utils/lib/react"

const borderColors = [...variants, "white"] as const

const positions = ["top", "bottom"] as const

interface CardProps extends DivAttrs {
    header?: React.ReactNode
    footer?: React.ReactNode
    headerStyle?: React.CSSProperties
    footerStyle?: React.CSSProperties
    img?: React.ReactElement
    imgPosition?: ValueOf<typeof positions>
    borderColor?: ValueOf<typeof borderColors>
}

export default function Card(
    {
        header,
        footer,
        headerStyle = {},
        footerStyle = {},
        img,
        imgPosition,
        borderColor,
        children,
        className,
        ...restProps
    }: CardProps
) {
    let imgEl: React.ReactElement | undefined
    const prefix = getPrefixFunc("card")
    const classes = classNames(
        className,
        prefix(),
        borderColor && `border-${borderColor}`
    )
    const renderChildren = () => {
        if (imgEl) {
            return imgPosition === "bottom" ? (
                <>
                    {children}
                    {imgEl}
                </>
            ) : (
                <>
                    {imgEl}
                    {children}
                </>
            )
        }

        return children
    }

    if (img) {
        const prefixImg = getPrefixFunc(prefix("img"))
        imgEl = React.cloneElement(
            img,
            {
                className: classNames(
                    img.props.className,
                    imgPosition ? prefixImg(imgPosition) : prefixImg()
                )
            }
        )
    }

    return (
        <div className={classes} {...restProps}>
            {
                isValidNode(header) && (
                    <div
                        className={prefix("header")}
                        style={headerStyle}>
                        {header}
                    </div>
                )
            }
            {renderChildren()}
            {
                isValidNode(footer) && (
                    <div
                        className={prefix("footer")}
                        style={headerStyle}>
                        {footer}
                    </div>
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
    img: PropTypes.element,
    imgPosition: PropTypes.oneOf(positions),
    borderColor: PropTypes.oneOf(borderColors),
}