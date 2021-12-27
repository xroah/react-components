import {WithVariantProp} from "../Commons/consts-and-types"
import {bool} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {variantPropType} from "../Commons/prop-types"
import {createComponent} from "reap-utils/lib/react"

interface LinkProps extends WithVariantProp<HTMLAnchorElement> {
    stretch?: boolean
}

export default createComponent<LinkProps>({
    tag: "a",
    propTypes: {
        variant: variantPropType,
        stretch: bool
    },
    propsHandler(
        {
            variant,
            stretch,
            ...restProps
        }
    ) {
        return {
            className: classNames(
                variant && `link-${variant}`,
                stretch && "stretched-link"
            ),
            newProps: restProps
        }
    }
})