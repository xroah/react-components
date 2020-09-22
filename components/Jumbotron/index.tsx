import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {CommonProps} from "../Common/CommonPropsInterface"

export interface JumbotronProps extends CommonProps<HTMLDivElement> {
    fluid?: boolean
}

export default function Jumbotron(props: JumbotronProps) {
    const {
        className,
        fluid,
        ...otherProps
    } = props
    const PREFIX = "jumbotron"

    return (
        <div className={
            classNames(
                className,
                PREFIX,
                fluid && `${PREFIX}-fluid`
            )
        } {...otherProps} />
    )
}

Jumbotron.propTypes = {
    fluid: PropTypes.bool
}
Jumbotron.defaultProps = {
    fluid: false
}