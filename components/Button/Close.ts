import {oneOf} from "prop-types"
import {camelCase, capitalize} from "reap-utils/lib"
import {createForwardRef} from "reap-utils/lib/react/create-component"
import {ButtonAttrs} from "../Commons/consts-and-types"

const variant = "white"
const PREFIX = "btn-close"

interface CloseProps extends ButtonAttrs {
    variant?: typeof variant
}

export default createForwardRef<CloseProps, HTMLButtonElement>({
    className: PREFIX,
    displayName: capitalize(camelCase(PREFIX)),
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