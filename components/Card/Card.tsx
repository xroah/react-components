import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {Variant, variants} from "../Commons/variants"
import {getPrefixFunc, isValidNode} from "../Commons/utils"

export type Color = Variant | "white" | "black" | "muted"
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode
    footer?: React.ReactNode
    headerStyle?: React.CSSProperties
    footerStyle?: React.CSSProperties
    textAlignment?: "start" | "center" | "end"
    img?: React.ReactNode
    imgPosition?: "top" | "bottom"
    bg?: Variant | "transparent"
    textColor?: Color
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
        textColor,
        children,
        className,
        ...restProps
    }: CardProps
) {
    const prefix = getPrefixFunc("card")
    const classes = classNames(
        className,
        prefix(),
        textAlignment && `text-${textAlignment}`,
        bg && `bg-${bg}`,
        textColor && `text-${textColor}`,
        borderColor && `border-${borderColor}`
    )
    let imgEl: React.ReactElement | undefined

    if (React.isValidElement(img)) {
        const CLASS = prefix("img")
        imgEl = React.cloneElement(
            img,
            {
                className: imgPosition ? CLASS : `${CLASS}-${imgPosition}`
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
            {
                imgPosition === "bottom" ? (
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