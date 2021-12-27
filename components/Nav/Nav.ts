import {ValueOf} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {bool, oneOf} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {createComponent} from "reap-utils/lib/react"

const variants = ["pills", "tabs"] as const

type Variant = ValueOf<typeof variants>

export interface NavProps extends React.HTMLAttributes<HTMLElement> {
    variant?: Variant
    fill?: boolean
    justify?: boolean
    vertical?: boolean
    navbar?: boolean
    scroll?: boolean  // valid when navbar is true
}

const NAVBAR_PREFIX = "navbar-nav"

export default createComponent<NavProps>({
    tag: "nav",
    className: NAVBAR_PREFIX,
    propTypes: {
        variant: oneOf(variants),
        fill: bool,
        justify: bool,
        navbar: bool,
        scroll: bool
    },
    propsHandler(
        {
            variant,
            fill,
            justify,
            vertical,
            navbar,
            scroll,
            ...restProps
        }
    ) {
        const prefix = getPrefixFunc("nav")
        const classes = classNames(
            navbar ? NAVBAR_PREFIX : prefix(),
            navbar && scroll && `${NAVBAR_PREFIX}-scroll`,
            vertical && "flex-column",
            variant && prefix(variant),
            fill && prefix("fill"),
            justify && prefix("justified")
        )

        return {
            className: classes,
            newProps: restProps
        }
    }
})
