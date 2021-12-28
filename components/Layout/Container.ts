import {bool, oneOf} from "prop-types"
import {
    breakpoints,
    Breakpoint,
    DivAttrs
} from "../Commons/consts-and-types"
import classNames from "reap-utils/lib/class-names"
import {getBreakpointPrefixFunc, getPrefixFunc} from "../Commons/utils"
import {createComponent} from "reap-utils/lib/react"

interface ContainerProps extends DivAttrs {
    fluid?: boolean
    breakpoint?: Breakpoint
}

export default createComponent<ContainerProps>({
    tag: "div",
    propTypes: {
        fluid: bool,
        breakpoint: oneOf(breakpoints)
    },
    propsHandler(
        {
            fluid,
            breakpoint,
            ...restProps
        }
    ) {
        const prefix = getPrefixFunc("container")
        const breakpointPrefix = getBreakpointPrefixFunc(
            prefix(),
            breakpoint
        )

        return {
            className: classNames(
                fluid ?
                    prefix("fluid") :
                    breakpointPrefix()
            ),
            newProps: restProps
        }
    }
})