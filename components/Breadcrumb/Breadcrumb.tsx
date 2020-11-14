import * as React from "react"
import {CommonProps} from "../Common/CommonPropsInterface"

function Breadcrumb(props: CommonProps<HTMLElement>) {
    const {
        children,
        ...otherProps
    } = props

    return (
        <nav {...otherProps}>
            <ol className="breadcrumb">
                {children}
            </ol>
        </nav>
    )
}

export default Breadcrumb