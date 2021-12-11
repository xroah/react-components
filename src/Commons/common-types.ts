export type ValueOf<T extends readonly any[]> = T[number]

export type Cb = () => void

export type Events = {
    onShow?: Cb
    onShown?: Cb
    onHide?: Cb
    onHidden?: Cb
}

export type CloseFuncParam = "btn" | "esc" | "backdrop"
export type CloseFunc = (v: CloseFuncParam) => void

export interface VisibleProps {
    visible?: boolean
}

export interface ClosableProps {
    closable?: boolean
    onClose?: Cb
}

export interface AutoHideProps {
    autoHide?: boolean
    delay?: number
}

export interface CommonTransitionProps extends VisibleProps {
    unmountOnExit?: boolean
    hideOnExit?: boolean
}