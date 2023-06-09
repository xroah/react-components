import React, {
    FC,
    HTMLAttributes,
    isValidElement,
    useState,
    MouseEvent,
    FocusEvent,
    cloneElement,
    useRef,
    useMemo
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

    return {
        show: Number(delay.show) || 0,
        hide: Number(delay.hide) || 0
    }
}

const Trigger: FC<TriggerProps> = (
    {
        trigger = "click",
        children,
        defaultVisible,
        overlay,
        visible: propVisible,
        onClickOutSide,
        delay,
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
    const realDelay = useMemo(
        () => getDelay(delay),
        [delay]
    )
    let handleClickOutSide = onClickOutSide

    if (!controlled && isValidElement(children)) {
        const performDelay = (callback: VoidFunction, sec: number) => {
            timeId.current = window.setTimeout(
                () => {
                    timeId.current = -1

                    callback()
                },
                sec
            )
        }
        const clearTimeout = () => {
            if (timeId.current !== -1) {
                window.clearTimeout(timeId.current)

                timeId.current = -1

                return true
            }

            return false
        }
        const performAction = (
            callback: VoidFunction,
            delay: number
        ) => {
            if (clearTimeout()) {
                return
            }

            if (delay > 0) {
                performDelay(callback, delay)
            } else {
                callback()
            }
        }

        const _show = () => setVisible(true)
        const _hide = () => setVisible(false)
        const show = () => performAction(_show, realDelay.show)
        const hide = () => performAction(_hide, realDelay.hide)
        const toggle = () => visible ? hide() : show()
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
                        const { currentTarget } = ev

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
                    popupProps.overlay = cloneElement(
                        overlay,
                        {
                            onMouseEnter(ev: MouseEvent) {
                                clearTimeout()
                                overlay.props?.onMouseEnter?.(ev)
                            },
                            onMouseLeave(ev: MouseEvent) {
                                performAction(hide, realDelay.hide)
                                overlay.props?.onMouseLeave?.(ev)
                            }
                        }
                    )
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