import { LayerProps } from "../commons/types"
import { useCallback, useRef } from "react"

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

export function useActive() {
    const activeEl = useRef<HTMLElement | null>(null)
    const setActive = () => {
        activeEl.current = document.activeElement as HTMLElement
    }
    const focus = () => {
        const { current: el } = activeEl

        if (el && el !== document.body) {
            el.focus()
        }

        activeEl.current = null
    }

    return [setActive, focus]
}