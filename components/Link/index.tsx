import * as React from "react"
import {Variant, variants} from "@commons/consts-and-types"
import {bool, oneOf} from "prop-types"
import classNames from "reap-utils/lib/class-names"

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    variant?: Variant
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
    variant: oneOf(variants),
    stretched: bool
}