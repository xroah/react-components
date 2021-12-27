import {oneOf} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {createComponent} from "reap-utils/lib/react"
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

export default createComponent<NavbarProps>({
    tag: "nav",
    propTypes: {
        variant: oneOf(lightDark),
        expand: oneOf([true, ...breakpoints])
    },
    propsHandler({
        variant,
        expand,
        ...restProps
    }) {
        const prefix = getPrefixFunc(PREFIX)
        const classes = classNames(
            prefix(),
            variant && prefix(variant),
            expand && getBreakpointClasses(prefix("expand"), expand)
        )

        return {
            className: classes,
            newProps: restProps
        }
    }
})