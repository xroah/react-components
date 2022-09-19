import {DivProps, Events} from "../Commons/common-types"
import {Alignment} from "@floating-ui/dom"
import {Side} from "@floating-ui/core"
import {Trigger as TriggerType} from "../Commons/common-types"

type BaseProps = Omit<DivProps, "children" | "onKeyDown">

export interface KeyDownCallback {
    (evt: React.KeyboardEvent<HTMLElement>): void
}

export interface OverlayCommonProps extends Events {
    placement?: Side
    children: React.ReactElement
    container?: string | HTMLElement
    fade?: boolean
    offset?: number | number[]
    arrow?: React.RefObject<HTMLElement>
    alignment?: Alignment
    onClickOutside?: (evt: MouseEvent) => void
    visible?: boolean
    overlayRef?: React.Ref<HTMLElement>
    autoUpdatePosition?: boolean
    onKeyDown?: KeyDownCallback
}

export interface OverlayProps extends OverlayCommonProps, BaseProps {
    targetRef: React.RefObject<HTMLElement>
    auto?: boolean
    unmountOnExit?: boolean
}

export interface OverlayState {
    style?: React.CSSProperties
}

export interface TriggerCommonProps extends OverlayCommonProps {
    nodeRef?: React.RefObject<HTMLElement>
    action?: TriggerType | TriggerType[]
    overlay: React.ReactElement
    unmountOnOverlayExit?: boolean
    onTargetKeyDown?: KeyDownCallback
}

export interface TriggerProps extends TriggerCommonProps {
    closeOnClickOutside?: boolean
}

export interface TriggerState {
    visible: Boolean
}