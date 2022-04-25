import * as React from "react"
import {omit} from "reap-utils"
import Trigger from "../Overlay/Trigger"
import {TriggerCommonProps} from "../Overlay/types"

interface DropdownProps extends TriggerCommonProps {
    autoClose?: boolean | "inside" | "outside"
}

type ContextValue = {
    close?: (() => void) | null
}

export const DropdownContext = React.createContext<ContextValue>({})

const Dropdown: React.FunctionComponent<DropdownProps> = (
    {
        autoClose,
        ...restProps
    }
) => {
    const ref = React.useRef<Trigger>(null)
    const overlayRef = React.useRef<HTMLElement>(null)
    const close = React.useCallback(
        () => ref.current?.hide(),
        []
    )
    const ctx = React.useMemo(
        () => {
            const value: ContextValue = {close: null}

            if (autoClose && autoClose !== "outside") {
                value.close = close
            }

            return value
        },
        [autoClose]
    )
    const selectMenu = React.useCallback(
        (next: boolean) => {
            const {current: el} = overlayRef

            if (!el) {
                return
            }

            const SELECTOR = `.dropdown-item:not(.disabled):not(:disabled)`
            const list = el.querySelectorAll(SELECTOR)
            const {activeElement} = document
            const len = list.length
            let activeIndex = -1
            let nextActive: Element

            if (activeElement) {
                for (let i = 0; i < len; i++) {
                    const item = list[i]

                    if (
                        item === activeElement ||
                        item.contains(activeElement)
                    ) {
                        activeIndex = i

                        break
                    }
                }
            }

            if (activeIndex === -1) {
                nextActive = next ? list[0] : list[len - 1]
            } else {
                activeIndex += next ? 1 : -1
                activeIndex = (activeIndex + len) % len
                nextActive = list[activeIndex]
            }

            if (nextActive) {
                (nextActive as HTMLElement).focus()
            }
        },
        []
    )
    const handleKeyDown = React.useMemo(
        () => {
            // controlled
            if ("visible" in restProps) {
                return () => { }
            }

            return (evt: React.KeyboardEvent) => {
                const t = evt.target as HTMLElement
                const isInput = /input|textarea/i.test(t.tagName)
                const key = evt.key.toLowerCase()
                const ESC_KEY = "escape"
                const UP_KEY = "arrowup"
                const DOWN_KEY = "arrowdown"
                const keySet = new Set([
                    ESC_KEY,
                    UP_KEY,
                    DOWN_KEY
                ])

                if (
                    !keySet.has(key) ||
                    (isInput && key !== ESC_KEY)
                ) {
                    return
                }

                if (key === ESC_KEY) {
                    close()
                } else {
                    ref.current?.show(() => selectMenu(key === DOWN_KEY))
                }

                evt.preventDefault()
                evt.stopPropagation()
            }
        },
        [restProps.visible]
    )

    omit(
        restProps,
        [
            "fade",
            "onClickOutside",
            "overlayRef"
        ]
    )

    return (
        <DropdownContext.Provider value={ctx}>
            <Trigger
                ref={ref}
                overlayRef={overlayRef}
                fade={false}
                closeOnClickOutside={autoClose && autoClose !== "inside"}
                onTargetKeyDown={handleKeyDown}
                onKeyDown={handleKeyDown}
                {...restProps} />
        </DropdownContext.Provider>
    )
}

Dropdown.defaultProps = {
    autoClose: true
}

export default Dropdown