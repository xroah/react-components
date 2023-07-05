import React, {
    Children,
    FC,
    Key,
    MouseEvent,
    ReactElement,
    cloneElement,
    isValidElement,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react"
import { DivProps } from "../commons/types"
import Title from "./title"
import { PaneProps } from "./pane"
import tabContext from "./context"
import { classnames } from "r-components/utils"

interface TabProps extends Omit<DivProps, "onChange"> {
    activeKey?: Key
    defaultActiveKey?: Key
    vertical?: boolean
    pill?: boolean
    onTabClick?: (k: Key, e: MouseEvent) => void
    onChange?: (k: Key) => void
}

const Tab: FC<TabProps> = (
    {
        defaultActiveKey,
        className,
        children,
        pill,
        vertical,
        onChange,
        ...restProps
    }: TabProps
) => {
    const controlled = "activeKey" in restProps
    const {
        activeKey: propActiveKey,
        onTabClick,
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
                            onClick={onTabClick}
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
    const setActive = (k: Key) => {
        if (controlled) {
            return
        }

        setActiveKey(k)
    }
    let finalActiveKey: Key

    if (controlled) {
        finalActiveKey = propActiveKey ?? firstKey!
    } else {
        finalActiveKey = activeKey ?? firstKey!
    }

    const activeKeyRef = useRef<Key>(finalActiveKey)

    useEffect(
        () => {
            if (finalActiveKey !== activeKeyRef.current) {
                activeKeyRef.current = finalActiveKey

                onChange?.(finalActiveKey)
            }
        },
        [finalActiveKey, onChange]
    )

    return (
        <tabContext.Provider value={{
            activeKey: finalActiveKey,
            setActive
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