import { LayerProps } from "../commons/types"
import { useCallback, useEffect, useState } from "react"
import { getZIndex, updateZIndex } from "../utils/z-index"

export function useZIndex() {
    const [zIndex] = useState(getZIndex())

    useEffect(updateZIndex, [zIndex])
    
    return zIndex
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
