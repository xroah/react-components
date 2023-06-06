import React, {
    Children,
    FC,
    cloneElement,
    isValidElement,
    useCallback,
    useState,
    ReactElement
} from "react"
import { DivProps } from "../commons/types"
import { ItemProps, KeyProp, PREFIX } from "./item"
import AccordionCtx from "./context"
import { classnames } from "../utils"

interface AccordionProps extends DivProps {
    alwaysOpen?: boolean
    defaultActiveKey?: KeyProp
    activeKey?: KeyProp
    flush?: boolean
}

function getKey(key?: KeyProp) {
    if (typeof key === "undefined") {
        return []
    }

    if (!Array.isArray(key)) {
        return [key]
    }

    return key
}

const Accordion: FC<AccordionProps> = (
    {
        alwaysOpen,
        defaultActiveKey,
        className,
        flush,
        children,
        ...restProps
    }: AccordionProps
) => {
    const controlled = "activeKey" in restProps
    const {
        activeKey: propActiveKey,
        ...props
    } = restProps
    const [
        activeKey,
        setActiveKey
    ] = useState(() => getKey(defaultActiveKey))
    const classes = classnames(
        className,
        PREFIX,
        flush && `${PREFIX}-flush`
    )
    const toggle = useCallback(
        (key: string | number) => setActiveKey(
            keys => {
                if (!alwaysOpen) {
                    if (keys[0] === key) {
                        return []
                    }

                    return [key]
                }

                if (keys.includes(key)) {
                    return keys.filter(k => k !== key)
                }

                return [...keys, key]
            }
        ),
        [alwaysOpen]
    )
    const newChildren = Children.toArray(children).map(
        (c, index) => {
            if (!isValidElement(c) || typeof c.type === "string") {
                return c
            }

            const key = c.props.itemKey ?? index

            return cloneElement(
                c as ReactElement<ItemProps>,
                { itemKey: key }
            )
        }
    )
    let finalActiveKey: KeyProp

    if (controlled) {
        finalActiveKey = getKey(propActiveKey)
    } else {
        finalActiveKey = activeKey
    }

    if (!alwaysOpen && finalActiveKey.length > 1) {
        finalActiveKey = [finalActiveKey[0]]
    }
    
    return (
        <AccordionCtx.Provider value={{
            activeKey: finalActiveKey,
            toggle
        }}>
            <div className={classes} {...props}>
                {newChildren}
            </div>
        </AccordionCtx.Provider>
    )
}

export default Accordion