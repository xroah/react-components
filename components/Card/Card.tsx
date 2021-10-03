import * as React from "react"
import PropTypes from "prop-types"
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

export const colorPropType = PropTypes.oneOf(textColors)

const positions = ["top", "bottom"] as const
const bgs = [...variants, "transparent"] as const

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode
    footer?: React.ReactNode
    headerStyle?: React.CSSProperties
    footerStyle?: React.CSSProperties
    textAlignment?: Alignment
    img?: React.ReactElement
    imgPosition?: ValueOf<typeof positions>
    bg?: ValueOf<typeof bgs>
    color?: TextColor
    borderColor?: ValueOf<typeof borderColors>
}

export default function Card(
    {
        header,
        footer,
        headerStyle = {},
        footerStyle = {},
        textAlignment,
        img,
        imgPosition,
        bg,
        borderColor,
        color,
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
        textAlignment && `text-${textAlignment}`,
        bg && `bg-${bg}`,
        color && `text-${color}`,
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
    textAlignment: PropTypes.oneOf(alignments),
    img: PropTypes.element,
    imgPosition: PropTypes.oneOf(positions),
    bg: PropTypes.oneOf(bgs),
    color: colorPropType,
    borderColor: PropTypes.oneOf(borderColors),
}