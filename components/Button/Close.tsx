import * as React from "react"
import {oneOf, symbol} from "prop-types"
import {camelCase} from "../Commons/utils"
import {createForwardRef} from "../Commons/create-component"
import {ButtonAttrs} from "../Commons/consts-and-types"

const variant = "white"
const PREFIX = "btn-close"

interface CloseProps extends ButtonAttrs {
    variant?: typeof variant
}

export default createForwardRef<CloseProps, HTMLButtonElement>({
    className: PREFIX,
    displayName: camelCase(PREFIX),
    propTypes: {
        variant: oneOf([variant])
    },
    propsHandler({
        variant,
        ...restProps
    }) {
        return {
            className: variant ? `${PREFIX}-${variant}` : "",
            newProps: restProps
        }
    }
})