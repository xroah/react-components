import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {SizeProp} from "../../Commons/consts-and-types"
import SizeConsumer from "../../Commons/SizeConsumer"
import {getPrefixFunc} from "../../Commons/utils"

export default function Select(
    {
        className,
        size,
        ...restProps
    }: SizeProp & React.SelectHTMLAttributes<HTMLSelectElement>
) {
    return (
        <SizeConsumer size={size}>
            {
                size => {
                    const prefix = getPrefixFunc("form-select")
                    const classes = classNames(
                        className,
                        prefix(),
                        size && prefix(size)
                    )

                    return <select className={classes} {...restProps} />
                }
            }
        </SizeConsumer>
    )
}