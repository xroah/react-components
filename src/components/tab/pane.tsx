import React, { FC, Key, useContext } from "react"
import { DivProps } from "../commons/types"
import { classnames, omit } from "../utils"
import tabContext from "./context"

export interface PaneProps extends DivProps {
    title: string
    disabled?: boolean
    itemKey?: Key
}

const Pane: FC<PaneProps> = (
    {
        className,
        itemKey,
        ...restProps
    }: PaneProps
) => {
    const ctx = useContext(tabContext)
    const classes = classnames(
        className,
        "tab-pane",
        ctx.activeKey === itemKey && "active"
    )

    omit(restProps, ["title", "disabled"])

    return <div className={classes} {...restProps} />
}

export default Pane