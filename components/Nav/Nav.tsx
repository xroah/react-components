import {ValueOf} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import {bool, oneOf} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"

const variants = ["pills", "tabs"] as const

type Variant = ValueOf<typeof variants>

interface NavProps extends React.HTMLAttributes<HTMLElement> {
    variant?: Variant
    fill?: boolean
    justify?: boolean
}

export default function Nav(
    {
        className,
        variant,
        fill,
        justify,
        ...restProps
    }: NavProps
) {
    const prefix = getPrefixFunc("nav")
    const classes = classNames(
        className,
        variant && prefix(variant),
        fill && prefix("fill"),
        justify && prefix("justified")
    )

    return <nav className={classes} {...restProps} />
}

Nav.propTypes = {
    variant: oneOf(variants),
    fill: bool,
    justify: bool
}