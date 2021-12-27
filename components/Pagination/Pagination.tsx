import React from "react"
import {createComponent} from "reap-utils/lib/react"
import {Size} from "../Commons/consts-and-types"
import {sizePropType} from "../Commons/prop-types"

type BaseProps = Omit<React.HTMLAttributes<HTMLUListElement>, "size">

export interface PaginationProps extends BaseProps {
    size?: Size
}

export default createComponent<PaginationProps>({
    tag: "ul",
    className: "pagination",
    propTypes: {
        size: sizePropType
    },
    propsHandler({
        size,
        ...restProps
    }) {
        return {
            className: size ? `pagination-${size}` : "",
            newProps: restProps
        }
    }
})