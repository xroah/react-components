import React, {
    FC,
    HTMLAttributes,
    isValidElement,
    useState,
    MouseEvent,
    FocusEvent,
    cloneElement,
    useRef
} from "react"
import Popup, { extractPopupProps, PopupProps } from "./popup"
import { OneOf } from "../commons/types"
import { isUndef } from "../utils"
import Context, { TriggerContext } from "./trigger-context"

export const placementsWithoutAlignment = [
    "top",
    "right",
    "bottom",
    "left"
] as const

export type PlacementsWithoutAlignment = OneOf<
    typeof placementsWithoutAlignment
>

const triggers = ["hover", "focus", "click"] as const

type TriggerType = OneOf<typeof triggers>

interface Delay {
    show?: number
    hide?: number
}

export interface TriggerProps extends PopupProps {
    trigger?: TriggerType | TriggerType[]
    defaultVisible?: boolean
    delay?: number | Delay
}

function getTrigger(trigger: TriggerType | TriggerType[]) {
    if (Array.isArray(trigger)) {
        return trigger
    }

    return [trigger]
}

function getDelay(delay?: number | Delay) {
    if (!delay) {
        return {
            show: 0,
            hide: 0
        }
    }

    if (typeof delay === "number") {
        return {
            show: delay,
            hide: delay
        }
    }

    return delay
}

const Trigger: FC<TriggerProps> = (
    {
        trigger = "click",
        children,
        defaultVisible,
        overlay,
        visible: propVisible,
        onClickOutSide,
        ...restProps
    }: TriggerProps
) => {
    const [visible, setVisible] = useState(defaultVisible)
    const controlled = !isUndef(propVisible)
    const realTrigger = getTrigger(trigger)
    const extractedProps = extractPopupProps(restProps)
    const timeId = useRef(-1)
    const popupProps: PopupProps = {
        ...extractedProps.popupProps,
        children,
        overlay,
        visible: controlled ? propVisible : visible
    }
    const ctx: TriggerContext = {
        visible: popupProps.visible,
        controlled
    }
    let handleClickOutSide = onClickOutSide

    if (!controlled && isValidElement(children)) {
        const show = () => setVisible(true)
        const hide = () => setVisible(false)
        const toggle = () => setVisible(v => !v)
        const listeners: HTMLAttributes<Element> = {}
        const cProps = children.props as HTMLAttributes<HTMLElement>
        ctx.show = show
        ctx.hide = hide
        ctx.toggle = toggle
        handleClickOutSide = ev => {
            hide()
            onClickOutSide?.(ev)
        }

        type ME = MouseEvent<HTMLElement>
        type FE = FocusEvent<HTMLElement>

        realTrigger.forEach(t => {
            switch (t) {
                case "click":
                    listeners.onClick = (ev: ME) => {
                        const {currentTarget} = ev

                        if (currentTarget) {
                            currentTarget.focus()
                        }

                        toggle()
                        cProps.onClick?.(ev)
                    }
                    break
                case "focus":
                    listeners.onFocus = (ev: FE) => {
                        show()
                        cProps.onFocus?.(ev)
                    }
                    listeners.onBlur = (ev: FE) => {
                        hide()
                        cProps.onBlur?.(ev)
                    }
                    break
                case "hover":
                    listeners.onMouseEnter = (ev: ME) => {
                        show()
                        cProps.onMouseEnter?.(ev)
                    }
                    listeners.onMouseLeave = (ev: ME) => {
                        hide()
                        cProps.onMouseLeave?.(ev)
                    }
                    break
                default:
                // do nothing
            }
        })

        popupProps.children = cloneElement(
            children,
            { ...listeners }
        )
    }

    return (
        <Context.Provider value={ctx}>
            <Popup
                onClickOutSide={handleClickOutSide}
                {...popupProps} />
        </Context.Provider>
    )
}

export default Trigger