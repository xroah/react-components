import React, {
    FC,
    useCallback,
    useState
} from "react"
import { DivProps } from "../commons/types"
import { KeyProp, PREFIX } from "./item"
import AccordionCtx from "./context"
import { classnames } from "../utils"

interface AccordionProps extends DivProps {
    alwaysOpen?: boolean
    defaultActiveKey?: KeyProp
    activeKey?: KeyProp
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
    const classes = classnames(className, PREFIX)
    const toggle = useCallback(
        (key: string | number) => setActiveKey(
            keys => {
                if (keys.includes(key)) {
                    return keys.filter(k => k !== key)
                }

                return [...keys, key]
            }
        ),
        []
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
            <div className={classes} {...props}></div>
        </AccordionCtx.Provider>
    )
}

export default Accordion