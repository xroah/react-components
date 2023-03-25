import { ReactNode } from "react"
import { Root } from "react-dom/client"
import { AlertProps } from "../basics/alert"
import { HookApi, ToggleEvents } from "../commons/types"

export interface OpenOptions extends Omit<MessageProps, "children"> {
    content?: ReactNode
    key?: string
}

export type ShortcutOptions = Omit<MessageProps, "variant" | "content">

export interface Shortcut {
    (msg: ReactNode, opts?: ShortcutOptions): VoidFunction
}

export interface MapItem {
    root: Root,
    container: HTMLElement
    props: OpenOptions
    close: VoidFunction
}

export interface HookOptions extends OpenOptions {
    _onHidden?: VoidFunction
    _onClose?: VoidFunction
}

export interface HookShortcut {
    (msg: ReactNode, opts?: ShortcutOptions): void
}

export interface MessageHookApi extends HookApi<OpenOptions> {
    info: HookShortcut
    error: HookShortcut
    success: HookShortcut
    warn: HookShortcut
}
export interface MessageProps extends AlertProps, ToggleEvents {
    duration?: number
    visible?: boolean
}

export interface OpenFunc {
    (opts: OpenOptions): (VoidFunction | void)
}