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
    return <div
        className={
            classNames(
                className,
                overlay ? "card-img-overlay" : "card-body"
            )
        }
        {...restProps}
    />
}