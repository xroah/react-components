import { LayerProps } from "../commons/types"
import { useCallback } from "react"

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
