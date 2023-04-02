import React, {
    FC,
    HTMLAttributes,
    ReactElement,
    isValidElement,
    useState,
    MouseEvent,
    FocusEvent,
    cloneElement,
    ElementType,
    createElement
} from "react"
import Popup, { PopupProps } from "./popup"
import { DivProps, OneOf } from "../commons/types"
import { isUndef } from "r-layers/utils"
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

interface TriggerProps
    extends PopupProps, DivProps {
    trigger?: TriggerType | TriggerType[]
    defaultVisible?: boolean
    wrapper?: ElementType
    children: ReactElement
}

export type CommonProps = Omit<
    TriggerProps,
    "overlay" |
    "arrowRef" |
    "floatingRef"
>

const getTrigger = (trigger: TriggerType | TriggerType[]) => {
    if (Array.isArray(trigger)) {
        return trigger
    }

    return [trigger]
}

const Trigger: FC<TriggerProps> = (
    {
        trigger = "click",
        anchorRef,
        children,
        defaultVisible,
        overlay,
        wrapper = "div",
        offset,
        flip,
        flipAlignment,
        transition,
        transitionClass,
        timeout,
        placement,
        arrowRef,
        visible: propVisible,
        floatingRef,
        fallbackPlacements,
        onUpdate,
        ...restProps
    }: TriggerProps
) => {
    const [visible, setVisible] = useState(defaultVisible)
    const controlled = !isUndef(propVisible)
    const realTrigger = getTrigger(trigger)
    const realOverlay = createElement(
        wrapper,
        {
            ref: floatingRef,
            ...restProps
        },
        overlay
    )
    const popupProps: PopupProps = {
        anchorRef,
        floatingRef,
        children,
        offset,
        flip,
        flipAlignment,
        transition,
        transitionClass,
        timeout,
        placement,
        arrowRef,
        overlay: realOverlay,
        fallbackPlacements,
        visible: controlled ? propVisible : visible,
        onUpdate
    }
    const ctx: TriggerContext = {}
    let childrenWithListeners: ReactElement = children

    if (!controlled && isValidElement(children)) {
        const show = () => setVisible(true)
        const hide = () => setVisible(false)
        const toggle = () => setVisible(v => !v)
        const listeners: HTMLAttributes<Element> = {}
        const cProps = children.props as HTMLAttributes<HTMLElement>
        ctx.show = show
        ctx.hide = hide
        ctx.toggle = toggle

        type ME = MouseEvent<HTMLElement>
        type FE = FocusEvent<HTMLElement>

        realTrigger.forEach(t => {
            switch (t) {
                case "click":
                    listeners.onClick = (ev: ME) => {
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

        childrenWithListeners = cloneElement(
            children,
            { ...listeners }
        )
    }

    return (
        <Context.Provider value={ctx}>
            <Popup {...popupProps}>
                {childrenWithListeners}
            </Popup>
        </Context.Provider>
    )
}

export default Trigger