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
                {...restProps} />
        </DropdownContext.Provider>
    )
}

Dropdown.defaultProps = {
    autoClose: true
}

export default Dropdown