import {element} from "prop-types"
import * as React from "react"
import {createComponent} from "reap-utils/lib/react"
import {ButtonAttrs} from "../Commons/consts-and-types"
import {TOGGLER_PREFIX} from "./constants"

interface TogglerProps extends ButtonAttrs {
    icon?: React.ReactElement
}

export default createComponent<TogglerProps>({
    tag: "button",
    className: TOGGLER_PREFIX,
    propTypes: {
        icon: element
    },
    render(
        className,
        {
            icon,
            children,
            ...restProps
        }
    ) {
        return (
            <button
                type="button"
                className={className}
                {...restProps}>
                {
                    React.isValidElement(icon) ? icon :
                        <span className={`${TOGGLER_PREFIX}-icon`} />
                }
                {children}
            </button>
        )
    }
})