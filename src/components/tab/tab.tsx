import React, {
    Children,
    FC,
    Key,
    ReactElement,
    cloneElement,
    isValidElement,
    useMemo,
    useState
} from "react"
import { DivProps } from "../commons/types"
import Title from "./title"
import { PaneProps } from "./pane"
import tabContext from "./context"
import { classnames } from "r-components/utils"

interface TabProps extends DivProps {
    activeKey?: Key
    defaultActiveKey?: Key
    vertical?: boolean
    pill?: boolean
}

const Tab: FC<TabProps> = (
    {
        defaultActiveKey,
        className,
        children,
        pill,
        vertical,
        ...restProps
    }: TabProps
) => {
    const controlled = "activeKey" in restProps
    const {
        activeKey: propActiveKey,
        ...props
    } = restProps
    const [activeKey, setActiveKey] = useState(defaultActiveKey)
    const classes = classnames(
        className,
        vertical && pill && "d-flex align-items-start"
    )
    const navClasses = classnames(
        "nav",
        pill ? "nav-pills" : "nav-tabs",
        vertical && pill && "flex-column"
    )
    const [
        firstKey,
        titles,
        newChildren
    ] = useMemo(
        () => {
            const titles: ReactElement[] = []
            let firstKey: Key
            const newChildren = Children.toArray(children).map(
                (c, index) => {
                    if (!isValidElement(c) || typeof c.type === "string") {
                        return c
                    }

                    const {
                        title,
                        disabled,
                        itemKey
                    } = c.props
                    const key = itemKey ?? index
                    firstKey = firstKey ?? key

                    titles.push(
                        <Title
                            title={title}
                            key={key}
                            itemKey={key}
                            disabled={disabled} />
                    )

                    return cloneElement(
                        c as ReactElement<PaneProps>,
                        { itemKey: key }
                    )
                }
            )

            return [firstKey!, titles, newChildren]
        },
        [children]
    )
    let finalActiveKey: Key

    if (controlled) {
        finalActiveKey = propActiveKey ?? firstKey!
    } else {
        finalActiveKey = activeKey ?? firstKey!
    }

    return (
        <tabContext.Provider value={{
            activeKey: finalActiveKey,
            setActive: setActiveKey
        }}>
            <div className={classes} {...props}>
                <div className={navClasses}>
                    {titles}
                </div>
                <div className="tab-content">
                    {newChildren}
                </div>
            </div>
        </tabContext.Provider>
    )
}

export default Tab