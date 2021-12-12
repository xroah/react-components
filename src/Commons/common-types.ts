export type ValueOf<T extends readonly any[]> = T[number]

export type Cb = () => void
export type CloseFuncParam = "close" | "esc" | "backdrop" | "auto"
export type CloseFunc = (type?: CloseFuncParam) => void

export type Events = {
    onShow?: Cb
    onShown?: Cb
    onHide?: Cb
    onHidden?: Cb
}

export interface VisibleProps {
    visible?: boolean
}

export interface ClosableProps {
    closable?: boolean
    onClose?: CloseFunc
}

export interface AutoHideProps {
    autoHide?: boolean
    delay?: number
}

export interface CommonTransitionProps {
    unmountOnExit?: boolean
    hideOnExit?: boolean
}