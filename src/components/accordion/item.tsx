import React, { ReactNode, FC, Key } from "react"
import { DivProps } from "../commons/types"

export type KeyProp = Key | Key[]

export const PREFIX = "accordion"

export interface ItemProps extends DivProps {
    title?: string
    header?: ReactNode
}

const Item: FC<ItemProps> = () => {
    return (
        <div></div>
    )
}

export default Item