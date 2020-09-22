import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"
import {CommonProps} from "../Common/CommonPropsInterface"

type spanType = "auto" | boolean | number

interface SizeObject {
    offset?: number
    span?: spanType
    order?: number
}

type sizeType = SizeObject | number | boolean | "auto"

export interface ColProps extends CommonProps<HTMLDivElement>, SizeObject {
    sm?: sizeType
    md?: sizeType
    lg?: sizeType
    xl?: sizeType
    alignment?: "start" | "center" | "end"
}

const spanPropType = PropTypes.oneOfType([
    PropTypes.oneOf(["auto"]),
    PropTypes.bool,
    PropTypes.number
])

const sizePropObject = PropTypes.shape({
    span: spanPropType,
    order: PropTypes.number,
    offset: PropTypes.number
})

const sizeProp = PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.oneOf(["auto"]),
    sizePropObject
])

export default class Col extends React.Component<ColProps> {

    static propTypes = {
        span: spanPropType,
        offset: PropTypes.number,
        order: PropTypes.number,
        sm: sizeProp,
        md: sizeProp,
        lg: sizeProp,
        xl: sizeProp,
        alignment: PropTypes.oneOf(["start", "center", "end"])
    }
    static defaultProps = {
        span: true
    }

    handleSpan(prefix: string, span?: spanType) {
        if (span) {
            return span === true ? prefix : `${prefix}-${span}`
        }

        return ""
    }

    handleOffsetOrOrder(type: string, val?: number) {
        return isUndef(val) ? "" : `${type}-${val}`
    }

    handleSize(val: sizeType, type: "sm" | "md" | "lg" | "xl") {
        const prefix = `col-${type}`

        if (isUndef(val) || val === false) {
            return ""
        }

        if (val === true) {
            return prefix
        }
        else if (val === "auto" || typeof val === "number") {
            return `${prefix}-${val}`
        }

        return [
            this.handleOffsetOrOrder(`offset-${type}`, val.offset),
            this.handleOffsetOrOrder(`order-${type}`, val.order),
            this.handleSpan(prefix, val.span === undefined ? true : val.span)
        ]
    }

    render() {
        const {
            span,
            offset,
            sm,
            md,
            lg,
            xl,
            order,
            className,
            alignment,
            ...otherProps
        } = this.props
        const classes = classNames(
            className,
            this.handleSpan("col", span),
            alignment && `align-self-${alignment}`,
            this.handleOffsetOrOrder("order", order),
            this.handleOffsetOrOrder("offset", offset)
        )
        const sizeClasses: any[] = []
        const size = [
            ["sm", sm],
            ["md", md],
            ["lg", lg],
            ["xl", xl]
        ]

        size.forEach(([type, val]) => {
            const tmp = this.handleSize(
                val as sizeType,
                type as any
            )
            sizeClasses.push(tmp)
        })

        return (
            <div className={
                classNames(classes, sizeClasses)
            } {...otherProps} />
        )
    }

}