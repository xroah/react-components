import * as React from "react"
import {func, node} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import Collapse from "../Collapse"
import {DivAttrs} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"

interface ClickFunc {
    (key: string, evt: React.MouseEvent<HTMLElement>): void
}

interface AccordionItemProps extends Omit<DivAttrs, "title"> {
    title?: React.ReactNode
    onHeaderClick?: ClickFunc
    // for internal only
    __key__?: string
    __open__?: boolean
}

export const PREFIX = "accordion"

const AccordionItem: React.FunctionComponent<AccordionItemProps> = (
    {
        className,
        title,
        children,
        onHeaderClick,
        __key__,
        __open__,
        ...restProps
    }
) => {
    const prefix = getPrefixFunc(PREFIX)
    const classes = classNames(
        classNames,
        prefix("item")
    )
    const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        if (onHeaderClick) {
            onHeaderClick(__key__!, evt)
        }
    }
    const btnClasses = classNames(
        prefix("button"),
        !__open__ && "collapsed"
    )

    return (
        <div className={classes} {...restProps}>
            <h2
                className={prefix("header")}
                onClick={handleClick}>
                <button className={btnClasses}>
                    {title}
                </button>
            </h2>
            <Collapse open={__open__}>
                <div className={prefix("collapse")}>
                    <div className={prefix("body")}>
                        {children}
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

AccordionItem.propTypes = {
    title: node,
    onHeaderClick: func
}

export default AccordionItem