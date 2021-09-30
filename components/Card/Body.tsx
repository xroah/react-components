import * as React from "react"
import PropTypes from "prop-types"
import classNames from "reap-utils/lib/class-names"

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    overlay?: boolean
}

export default function CardBody({
    overlay,
    className,
    ...restProps
}: CardBodyProps) {
    const classes = classNames(
        className,
        overlay ? "card-img-overlay" : "card-body"
    )

    return <div className={classes} {...restProps}
    />
}

CardBody.propTypes = {
    overlay: PropTypes.bool
}