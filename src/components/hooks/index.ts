import { useCallback, useRef, TouchEvent } from "react"
import { LayerProps } from "../commons/types"

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

type E<T> = TouchEvent<T>

type TouchHandler<T> = (ev: E<T>) => unknown

interface SwipeOptions<T> {
    onTouchStart?: TouchHandler<T>
    onTouchMove?: TouchHandler<T>
    onTouchEnd?: TouchHandler<T>
    onPrev?: VoidFunction
    onNext?: VoidFunction
}

export function useSwipe<T  extends Element = HTMLDivElement>(
    threshold = 40,
    options: SwipeOptions<T> = {}
) {
    const startX = useRef(0)
    const deltaX = useRef(0)
    const handleTouchStart = (ev: E<T>) => {
        startX.current = ev.touches[0].clientX
        deltaX.current = 0

        options.onTouchStart?.(ev)
    }
    const handleTouchMove = (ev: E<T>) => {
        if (ev.touches.length > 1) {
            deltaX.current = 0
        } else {
            deltaX.current = ev.touches[0].clientX
        }

        options.onTouchMove?.(ev)
    }
    const handleTouchEnd = (ev: E<T>) => {
        const moved = deltaX.current - startX.current

        if (Math.abs(moved) >= threshold) {
            if (moved > 0) {
                options.onPrev?.()
            } else {
                options.onNext?.()
            }
        }

        options.onTouchEnd?.(ev)
    }

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    }
}