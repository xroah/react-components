import {element} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {ButtonAttrs} from "../Commons/consts-and-types"
import {TOGGLER_PREFIX} from "./constants"

interface TogglerProps extends ButtonAttrs {
    icon?: React.ReactElement
}

const NavbarToggler: React.FunctionComponent<TogglerProps> = (
    {
        className,
        icon,
        children,
        ...restProps
    }
) => {
    const classes = classNames(className, TOGGLER_PREFIX)

    return (
        <button
            type="button"
            className={classes}
            {...restProps}>
            {
                React.isValidElement(icon) ? icon :
                    <span className={`${TOGGLER_PREFIX}-icon`} />
            }
            {children}
        </button>
    )
}

NavbarToggler.propTypes = {
    icon: element
}

export default NavbarToggler