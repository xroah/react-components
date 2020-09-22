import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {CommonProps} from "../Common/CommonPropsInterface"

type colsType = {
    default: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number
}

export interface RowProps extends CommonProps<HTMLDivElement> {
    noGutters?: boolean
    alignment?: "start" | "center" | "end"
    justify?: "start" | "center" | "end" | "between" | "around"
    form?: boolean
    cols?: number | colsType
}

export default function Row(props: RowProps) {
    const {
        className,
        noGutters,
        alignment,
        justify,
        form,
        cols,
        ...otherProps
    } = props
    const COL_PREFIX = "row-cols"
    const handleCols = () => {
        if (!cols) {
            return
        }

        if (typeof cols === "number") {
            return `${COL_PREFIX}-${cols}`
        }

        const {
            default: d,
            sm,
            md,
            lg,
            xl
        } = cols

        return classNames(
            d && `${COL_PREFIX}-${d}`,
            sm && `${COL_PREFIX}-sm-${sm}`,
            md && `${COL_PREFIX}-md-${md}`,
            lg && `${COL_PREFIX}-lg-${lg}`,
            xl && `${COL_PREFIX}-xl-${xl}`
        )
    }

    return (
        <div className={
            classNames(
                className,
                form ? "form-row" : "row",
                noGutters && "no-gutters",
                alignment && `align-items-${alignment}`,
                justify && `justify-content-${justify}`,
                handleCols()
            )
        } {...otherProps} />
    )
}

Row.defaultProps = {
    noGutters: false,
    form: false
}
Row.propTypes = {
    noGutters: PropTypes.bool,
    alignment: PropTypes.oneOf(["start", "center", "end"]),
    justify: PropTypes.oneOf(["start", "center", "end", "between", "around"]),
    form: PropTypes.bool,
    cols: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
            default: PropTypes.number,
            sm: PropTypes.number,
            md: PropTypes.number,
            lg: PropTypes.number,
            xl: PropTypes.number
        })
    ])
}