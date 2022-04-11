import * as React from "react"
import Trigger, {TriggerProps} from "../Overlay/Trigger"

interface DropdownProps extends TriggerProps {
    autoClose?: boolean | "inside" | "outside"
}

type ContextValue = {
    close?: (() => void) | null
}

export const DropdownContext = React.createContext<ContextValue>({})

function Dropdown(
    {
        autoClose,
        ...restProps
    }: DropdownProps
) {
    delete restProps.fade

    return <Trigger fade={false} {...restProps}/>
}

export default Dropdown