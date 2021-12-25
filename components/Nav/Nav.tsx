import {ValueOf} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {bool, oneOf} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"

const variants = ["pills", "tabs"] as const

type Variant = ValueOf<typeof variants>

export interface NavProps extends React.HTMLAttributes<HTMLElement>{
    variant?: Variant
    fill?: boolean
    justify?: boolean
    vertical?: boolean
    navbar?: boolean
    scroll?: boolean  // valid when navbar is true
}

const Nav: React.FunctionComponent<NavProps> = (
    {
        className,
        variant,
        fill,
        justify,
        vertical,
        navbar,
        scroll,
        ...restProps
    }
) => {
    const prefix = getPrefixFunc("nav")
    const NAVBAR_PREFIX = "navbar-nav"
    const classes = classNames(
        className,
        navbar ? NAVBAR_PREFIX : prefix(),
        navbar && scroll && `${NAVBAR_PREFIX}-scroll`,
        vertical && "flex-column",
        variant && prefix(variant),
        fill && prefix("fill"),
        justify && prefix("justified")
    )

    return <nav className={classes} {...restProps} />
}

Nav.propTypes = {
    variant: oneOf(variants),
    fill: bool,
    justify: bool,
    navbar: bool,
    scroll: bool
}

export default Nav