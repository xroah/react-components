import * as React from "react"
import Trigger, {TriggerProps} from "../Overlay/Trigger"

interface DropdownProps extends TriggerProps {
    autoClose?: boolean | "inside" | "outside"
}

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