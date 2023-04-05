import React, {
    ForwardedRef,
    forwardRef,
    KeyboardEvent,
    MouseEvent,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef
} from "react"
import { classnames, generateKey } from "../utils"
import MenuItem, { MenuItemProps } from "./menu-item"
import triggerContext from "../popup/trigger-context"
import { DivProps } from "r-layers/commons/types"

type ME = MouseEvent<HTMLButtonElement>
type KE = KeyboardEvent<HTMLButtonElement>

interface EventParams {
    command?: string
    event: ME | KE
}

export interface MenuProps extends Omit<DivProps, "onSelect"> {
    onSelect?: (e: EventParams) => void
    items: MenuItemProps[]
    header?: ReactNode
    nodeRef?: RefObject<HTMLDivElement>
}

export interface MenuApi {
    focusFirst: VoidFunction
    focusLast: VoidFunction
}

function getMenuItems(menu: HTMLDivElement | null) {
    if (!menu) {
        return []
    }

    const items = menu.querySelectorAll(".dropdown-item")

    return Array.from(items) as HTMLButtonElement[]
}

export function handleArrowOrEscKeyDown(
    ev: KeyboardEvent,
    options: {
        onArrowUp?: VoidFunction,
        onArrowDown?: VoidFunction,
        onEscape?: VoidFunction
    } = {}
) {
    const ARROW_UP_KEY = "arrowup"
    const ARROW_DOWN_KEY = "arrowdown"
    const ESCAPE_KEY = "escape"
    const key = ev.key.toLowerCase()
    const isArrowOrEscapeKey = [
        ARROW_DOWN_KEY,
        ARROW_UP_KEY,
        ESCAPE_KEY
    ].includes(key)
    const target = ev.target as HTMLElement
    const isInput =  /input|textarea/i.test(target.tagName)

    if (!isArrowOrEscapeKey) {
        return
    }

    if (isInput && key !== ESCAPE_KEY) {
        return
    }

    ev.preventDefault()

    if (key === ARROW_UP_KEY) {
        return options.onArrowUp?.()
    }

    if (key === ARROW_DOWN_KEY) {
        return options.onArrowDown?.()
    }

    options.onEscape?.()
}

const Menu = forwardRef(
    (
        {
            className,
            items,
            header,
            nodeRef,
            onSelect,
            onKeyDown,
            ...restProps
        }: MenuProps,
        ref: ForwardedRef<MenuApi>
    ) => {
        const triggerCtx = useContext(triggerContext)
        const classes = classnames(
            className,
            "show",
            "dropdown-menu"
        )
        const elRef = nodeRef ?? useRef(null)
        const focusIndex = useRef(-1)
        const activeEl = useRef<HTMLElement | null>(null)
        const handleKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
            handleArrowOrEscKeyDown(
                ev,
                {
                    onArrowUp() {
                        focusItem(focusIndex.current - 1, true)
                    },
                    onArrowDown() {
                        focusItem(focusIndex.current + 1)
                    },
                    onEscape() {
                        activeEl.current?.focus()
                        triggerCtx.hide?.()

                        activeEl.current = null
                    }
                }
            )
            onKeyDown?.(ev)
        }
        const menuItems = useMemo(
            () => {
                return items.map(item => {
                    const {
                        type = "item",
                        command,
                        onClick,
                        onKeyDown
                    } = item
                    let handleClick = onClick
                    let handleKeyDown = onKeyDown

                    if (type === "item") {
                        handleClick = (ev: ME) => {
                            onSelect?.({
                                command,
                                event: ev
                            })
                            onClick?.(ev)
                            triggerCtx.hide?.()
                        }
                        handleKeyDown = (ev: KE) => {
                            if (ev.key.toLowerCase() === "enter") {
                                onSelect?.({
                                    command,
                                    event: ev
                                })
                                triggerCtx.hide?.()
                            }

                            onKeyDown?.(ev)
                        }
                    }

                    return {
                        type,
                        onClick: handleClick,
                        onKeyDown: handleKeyDown,
                        key: generateKey(),
                        ...item
                    }
                })
            },
            [items]
        )
        const focusItem = (
            index: number | "last",
            reverse = false
        ) => {
            const items = getMenuItems(elRef.current)
            const len = items.length

            if (!items.length) {
                return
            }

            let i: number

            if (index === "last" || index >= len) {
                i = len - 1
            } else if (index < 0) {
                i = 0
            } else {
                i = index
            }

            while (reverse ? i >= 0 : i < len) {
                const item = items[i]

                if (!item.disabled) {
                    focusIndex.current = i
                    item.focus()

                    break
                }

                reverse ? i -= 1 : i += 1
            }
        }
        const focusFirst = () => focusItem(0)
        const focusLast = () => focusItem("last", true)

        useImperativeHandle(
            ref,
            () => ({
                focusFirst,
                focusLast
            })
        )

        useEffect(
            () => {
                if (triggerCtx.visible) {
                    const a = document.activeElement as HTMLElement
                    activeEl.current = a
                } else {
                    activeEl.current = null
                }
            },
            [triggerCtx.visible]
        )

        return (
            <div
                tabIndex={-1}
                ref={elRef}
                onKeyDown={handleKeyDown}
                className={classes}
                {...restProps}>
                {
                    header ? (
                        <h6 className="dropdown-header">
                            {header}
                        </h6>
                    ) : null
                }
                {
                    menuItems.map(
                        ({ key, ...rest }) => (
                            <MenuItem key={key} {...rest} />
                        )
                    )
                }
            </div>
        )
    }
)

Menu.displayName = "Menu"

export default Menu