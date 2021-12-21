import * as React from "react"
import {func, node} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import Collapse from "../Collapse"
import {DivAttrs} from "../Commons/consts-and-types"
import {getPrefixFunc} from "../Commons/utils"
import Context from "./context"

interface ClickFunc {
    (key: React.Key, evt: React.MouseEvent<HTMLElement>): void
}

interface AccordionItemProps extends Omit<DivAttrs, "title"> {
    title?: React.ReactNode
    onHeaderClick?: ClickFunc
    // for internal only
    __key__?: React.Key
}

export const PREFIX = "accordion"

const AccordionItem: React.FunctionComponent<AccordionItemProps> = (
    {
        className,
        title,
        onHeaderClick,
        children,
        __key__,
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

    return (
        <Context.Consumer>
            {
                active => {
                    const open = active.has(__key__!)
                    const btnClasses = classNames(
                        prefix("button"),
                        !open && "collapsed"
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
                            <Collapse open={open}>
                                <div className={prefix("collapse")}>
                                    <div className={prefix("body")}>
                                        {children}
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    )
                }
            }
        </Context.Consumer>
    )
}

AccordionItem.propTypes = {
    title: node,
    onHeaderClick: func
}

export default AccordionItem