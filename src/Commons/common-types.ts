export type ValueOf<T extends readonly any[]> = T[number]

export type Cb = () => void

export type Events = {
    onShow?: Cb
    onShown?: Cb
    onHide?: Cb
    onHidden?: Cb
}