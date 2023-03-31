import React, {
    FC,
    HTMLAttributes,
    ReactElement,
    isValidElement,
    useState,
    MouseEvent,
    FocusEvent,
    cloneElement,
    useRef,
    CSSProperties,
    ElementType,
    createElement
} from "react"
import Popup, { PopupProps } from "./popup"
import { DivProps, OneOf, ToggleEvents } from "../commons/types"
import { isUndef } from "r-layers/utils"
import { ComputePositionReturn } from "@floating-ui/dom"

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
    extends PopupProps, ToggleEvents, DivProps {
    trigger?: TriggerType | TriggerType[]
    defaultVisible?: boolean
    arrow?: boolean
    arrowProps?: DivProps
    wrapper?: ElementType | null
    children: ReactElement
}

export type CommonProps = Omit<
    TriggerProps,
    "overlay" | "arrowRef"
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
        arrow,
        arrowProps,
        offset,
        flip,
        flipAlignment,
        transition,
        transitionClass,
        timeout,
        placement,
        fallbackPlacements,
        visible: propVisible,
        style,
        onUpdate,
        ...restProps
    }: TriggerProps
) => {
    let realOverlay = overlay
    const arrowRef = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(defaultVisible)
    const [pos, setPos] = useState<CSSProperties>({})
    const [
        arrowStyle,
        setArrowStyle
    ] = useState<CSSProperties>({
        position: "absolute"
    })
    const controlled = !isUndef(propVisible)
    const realTrigger = getTrigger(trigger)
    let childrenWithListeners: ReactElement = children

    if (!controlled && isValidElement(children)) {
        const show = () => setVisible(true)
        const hide = () => setVisible(false)
        const toggle = () => {
            setVisible(visible => !visible)
        }
        const listeners: HTMLAttributes<Element> = {}
        const cProps = children.props as HTMLAttributes<HTMLElement>

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

    if (wrapper) {
        const {
            style: arrowPropStyle,
            ...rest
        } = arrowProps ?? {}
        realOverlay = createElement(
            wrapper,
            {
                style: {
                    ...style,
                    ...pos
                },
                ...restProps
            },
            <>
                {
                    arrow ? (
                        <div
                            ref={arrowRef}
                            style={{
                                ...arrowPropStyle,
                                ...arrowStyle
                            }}
                            {...rest} />
                    ) : null
                }
                {overlay}
            </>
        )
    }
    const handleUpdate = (data: ComputePositionReturn) => {
        const {
            x,
            y,
            middlewareData
        } = data
        
        if (arrow) {
            const { x, y } = middlewareData.arrow ?? {}

            setArrowStyle({
                ...arrowStyle,
                transform: `translate(${x ?? 0}px, ${y ?? 0}px)`
            })
        }

        setPos({
            transform: `translate(${x}px, ${y}px)`
        })
        onUpdate?.(data)
    }
    const popupProps: PopupProps = {
        anchorRef,
        children,
        offset,
        flip,
        flipAlignment,
        transition,
        transitionClass,
        timeout,
        placement,
        arrowRef,
        fallbackPlacements,
        overlay: realOverlay,
        visible: controlled ? propVisible : visible,
        onUpdate: handleUpdate
    }

    return (
        <Popup {...popupProps}>
            {childrenWithListeners}
        </Popup>
    )
}

export default Trigger