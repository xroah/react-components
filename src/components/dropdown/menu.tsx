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
    showMenu: VoidFunction
    focusFirst: VoidFunction
    focusLast: VoidFunction
    escape: VoidFunction
}

function getEnabledMenuItems(menu: HTMLDivElement | null) {
    if (!menu) {
        return []
    }

    const SELECTOR = ".dropdown-item:not(:disabled)"
    const items = menu.querySelectorAll(SELECTOR)

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
    const isArrowKey = [
        ARROW_DOWN_KEY,
        ARROW_UP_KEY,
        ESCAPE_KEY
    ].includes(key)

    if (!isArrowKey) {
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
        const classes = classnames(className, "dropdown-menu")
        const elRef = nodeRef ?? useRef(null)
        const focusIndex = useRef(-1)
        const activeEl = useRef<HTMLElement | null>(null)
        const handleKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => {
            handleArrowOrEscKeyDown(
                ev,
                {
                    onArrowUp() {
                        focusItem(focusIndex.current - 1)
                    },
                    onArrowDown() {
                        focusItem(focusIndex.current + 1)
                    },
                    onEscape() {
                        activeEl.current?.focus()
                        escape()

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
                        ...item
                    }
                })
            },
            [items]
        )
        const focusItem = (index: number | "last") => {
            const items = getEnabledMenuItems(elRef.current)
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

            focusIndex.current = i
            
            items[i].focus()
        }
        const focusFirst = () => focusItem(0)
        const focusLast = () => focusItem("last")
        const escape = () => {
            triggerCtx.hide?.()
        }

        useImperativeHandle(
            ref,
            () => ({
                focusFirst,
                focusLast,
                showMenu() {
                    if (triggerCtx.visible === false) {
                        triggerCtx.show?.()
                    }
                },
                escape
            })
        )

        useEffect(
            () => {
                if (triggerCtx.visible) {
                    activeEl.current = document.activeElement as HTMLElement
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
                    menuItems.map(item => (
                        <MenuItem key={generateKey()} {...item} />
                    ))
                }
            </div>
        )
    }
)

Menu.displayName = "Menu"

export default Menu