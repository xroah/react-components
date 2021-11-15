import * as React from "react"
import {WithVariantProp} from "@commons/consts-and-types"
import {bool} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {variantPropType} from "@commons/prop-types"

interface LinkProps extends WithVariantProp<HTMLAnchorElement> {
    stretch?: boolean
}

export default function Link(
    {
        className,
        variant,
        stretch,
        ...restProps
    }: LinkProps
) {
    const classes = classNames(
        className,
        variant && `link-${variant}`,
        stretch && "stretched-link"
    )

    return <a className={classes} {...restProps} />
}

Link.propTypes = {
    variant: variantPropType,
    stretched: bool
}