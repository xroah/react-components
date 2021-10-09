import * as React from "react"
import PropTypes, {oneOf} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {
    Alignment,
    alignments,
    TextColor,
    textColors,
    ValueOf,
    variants
} from "../Commons/consts-and-types"
import {getPrefixFunc, isValidNode} from "../Commons/utils"

const borderColors = [...variants, "white"] as const

const positions = ["top", "bottom"] as const

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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