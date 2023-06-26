import React, {
    Children,
    FC,
    cloneElement,
    isValidElement,
    useCallback,
    useState,
    ReactElement,
    useMemo,
    Validator
} from "react"
import { DivProps } from "../commons/types"
import { ItemProps, KeyProp, PREFIX } from "./item"
import AccordionCtx from "./context"
import { classnames, isUndef } from "../utils"
import { arrayOf, bool, number, oneOfType, string } from "prop-types"

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
        activeKey: propActiveKey,
        ...restProps
    }: AccordionProps
) => {
    const controlled = !isUndef(propActiveKey)
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
    const newChildren = useMemo(
        () => Children.toArray(children).map(
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
        ),
        [children]
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
            <div className={classes} {...restProps}>
                {newChildren}
            </div>
        </AccordionCtx.Provider>
    )
}

const keyType = oneOfType([
    string,
    number,
    arrayOf(string),
    arrayOf(number)
]) as Validator<KeyProp>
Accordion.propTypes = {
    alwaysOpen: bool,
    defaultActiveKey: keyType,
    activeKey: keyType,
    flush: bool
}

export default Accordion