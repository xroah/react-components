import React, {
    FC,
    Key,
    useContext,
    MouseEvent
} from "react"
import { PaneProps } from "./pane"
import tabContext from "./context"
import { classnames } from "../utils"

interface TitleProps extends Omit<PaneProps, "onClick"> {
    onClick?: (k: Key, e: MouseEvent) => void
}

const Title: FC<TitleProps> = (
    (
        {
            title,
            disabled,
            itemKey,
            onClick
        }: TitleProps
    ) => {
        const ctx = useContext(tabContext)
        const handleClick = (ev: MouseEvent) => {
            ctx.setActive(itemKey!)
            onClick?.(itemKey!, ev)
        }
        const btnClasses = classnames(
            "nav-link",
            ctx.activeKey === itemKey && "active"
        )

        return (
            <button
                type="button"
                className={btnClasses}
                disabled={disabled}
                onClick={handleClick}>
                {title}
            </button>
        )
    }
)

export default Title