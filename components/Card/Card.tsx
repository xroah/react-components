import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Variant, variants} from "../Commons/variants"
import {getPrefixFunc, isValidNode} from "../Commons/utils"

const otherColors = [
    "white",
    "black",
    "muted",
    "white-50",
    "black-50"
] as const

export type Color = Variant | (typeof otherColors)[number]

export const colorPropType = PropTypes.oneOf([
    ...variants,
    ...otherColors
])

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode
    footer?: React.ReactNode
    headerStyle?: React.CSSProperties
    footerStyle?: React.CSSProperties
    textAlignment?: "start" | "center" | "end"
    img?: React.ReactElement
    imgPosition?: "top" | "bottom"
    bg?: Variant | "transparent"
    color?: Color
    borderColor?: Variant
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
        const CLASS = prefix("img")
        imgEl = React.cloneElement(
            img,
            {
                className: classNames(
                    img.props.className,
                    imgPosition ? `${CLASS}-${imgPosition}` : CLASS
                )
            }
        )
    }

    return (
        <div className={classes} {...restProps}>
            {
                isValidNode(header) && (
                    <div className={prefix("header")} style={headerStyle}>
                        {header}
                    </div>
                )
            }
            {renderChildren()}
            {
                isValidNode(footer) && (
                    <div className={prefix("footer")} style={headerStyle}>
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
    textAlignment: PropTypes.oneOf(["start", "center", "end"]),
    img: PropTypes.element,
    imgPosition: PropTypes.oneOf(["top", "bottom"]),
    bg: PropTypes.oneOf([...variants, "transparent"]),
    color: colorPropType,
    borderColor: PropTypes.oneOf(variants),
}