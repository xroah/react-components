import React, { FC, useContext } from "react"
import { PaneProps } from "./pane"
import tabContext from "./context"
import { classnames } from "../utils"

const Title: FC<PaneProps> = (
    (
        {
            title,
            disabled,
            itemKey
        }: PaneProps
    ) => {
        const ctx = useContext(tabContext)
        const handleClick = () => {
            ctx.setActive(itemKey!)
        }
        const btnClasses = classnames(
            "nav-link",
            ctx.activeKey === itemKey && "active"
        )

        return (
            <button
                className={btnClasses}
                disabled={disabled}
                onClick={handleClick}>
                {title}
            </button>
        )
    }
)

export default Title