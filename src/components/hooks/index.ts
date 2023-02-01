import { LayerProps } from "../commons/types"
import { useCallback, useState } from "react"

let zIndex = 1000

export function useZIndex() {
    return useState(zIndex++)
}

export function useKeyboardClose(
    {
        keyboard = true,
        onClose,
        onKeyDown
    }: LayerProps
) {
    return useCallback(
        (ev: React.KeyboardEvent<HTMLDivElement>) => {
            onKeyDown?.(ev)

            if (keyboard && ev.key.toLowerCase() === "escape") {
                onClose?.("keyboard")
            }
        },
        [keyboard, onKeyDown, onClose]
    )
}
