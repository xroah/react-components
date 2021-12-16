import {element, string} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {DivAttrs} from "../Commons/consts-and-types"
import {onlyChild} from "../Commons/utils"

let uuid = 0

interface FloatingProps extends DivAttrs {
    label: string
    htmlFor?: string
    children: React.ReactElement
}

function Floating(
    {
        className,
        label,
        htmlFor,
        children,
        ...restProps
    }: FloatingProps
) {
    const PREFIX = "bs-form-floating-"
    const classes = classNames(
        className,
        "form-floating"
    )
    const c = onlyChild(children)
    let id: string = `${PREFIX}${uuid++}`

    if (htmlFor) {
        id = htmlFor
    } else if (c.props.id) {
        id = c.props.id
    }

    return (
        <div className={classes} {...restProps}>
            {React.cloneElement(c, {id})}
            <label htmlFor={id}>{label}</label>
        </div>
    )
}


Floating.propTypes = {
    label: string.isRequired,
    htmlFor: string,
    children: element.isRequired
}
Floating.displayName = "FormFloating"

export default Floating