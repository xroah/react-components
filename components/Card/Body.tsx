import React from "react"
import {CommonProps} from "../Common/Overlay";
import {classNames} from "../utils";
import PropTypes from "prop-types"

interface BodyProps extends CommonProps {
    overlay?: boolean
}

export default function CardBody(props: BodyProps) {
    const {
        overlay,
        className,
        ...otherProps
    } = props

    return (
        <div className={
            classNames(
                className,
                overlay ? "card-img-overlay" : "card-body"
            )
        } {...otherProps} />
    )
}

CardBody.propType = {
    overlay: PropTypes.bool
}
CardBody.defaultProps = {
    overlay: false
}