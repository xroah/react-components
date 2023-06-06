import React, {
    ReactNode,
    FC,
    Key,
    useContext,
    useMemo
} from "react"
import accordionCtx from "./context"
import { DivProps } from "../commons/types"
import { classnames } from "../utils"
import Collapse from "../collapse"

export type KeyProp = Key | Key[]

export const PREFIX = "accordion"

export interface ItemProps extends DivProps {
    title?: string
    header?: ReactNode
    itemKey?: Key
}

const Item: FC<ItemProps> = (
    {
        title,
        header,
        itemKey,
        className,
        children,
        ...restProps
    }: ItemProps
) => {
    const ctx = useContext(accordionCtx)
    const classes = classnames(className, `${PREFIX}-item`)
    const open = useMemo(
        () => ctx.activeKey.includes(itemKey ?? ""),
        [ctx.activeKey]
    )
    const handleClick = () => ctx.toggle(itemKey ?? "")
    const finalHeader = header === undefined ? (
        <h2 className={`${PREFIX}-header`}>
            <button
                type="button"
                className={classnames(
                    `${PREFIX}-button`,
                    !open && "collapsed"
                )}
                onClick={handleClick}>
                {title}
            </button>
        </h2>
    ) : header

    return (
        <div className={classes} {...restProps}>
            {finalHeader}
            <Collapse open={open} className={`${PREFIX}-collapse`}>
                <div className={`${PREFIX}-body`}>
                    {children}
                </div>
            </Collapse>
        </div>
    )
}

export default Item