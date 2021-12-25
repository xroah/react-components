import {oneOf, oneOfType} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {
    Breakpoint,
    breakpoints,
    lightDark,
    ValueOf
} from "../Commons/consts-and-types"
import {getBreakpointClasses, getPrefixFunc} from "../Commons/utils"
import {PREFIX} from "./constants"

interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    variant?: ValueOf<typeof lightDark>
    expand?: true | Breakpoint
}

const Navbar: React.FunctionComponent<NavbarProps> = (
    {
        className,
        variant,
        expand,
        ...restProps
    }
) => {
    const prefix = getPrefixFunc(PREFIX)
    const classes = classNames(
        className,
        prefix(),
        variant && prefix(variant),
        expand && getBreakpointClasses(prefix("expand"), expand)
    )

    return <nav className={classes} {...restProps} />
}

Navbar.propTypes = {
    variant: oneOf(lightDark),
    expand: oneOf([true, ...breakpoints])
}

export default Navbar