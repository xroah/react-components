import * as React from "react"
import CustomControl, {CustomControlProps} from "./CustomControl"

function factory(type: string) {
    return (props: CustomControlProps, ref: React.Ref<any>) => {
        return (
            <CustomControl
                type={type}
                ref={ref}
                {...props} />
        )
    }
}

export const Checkbox = React.forwardRef(factory("checkbox"))
export const Radio = React.forwardRef(factory("radio"))
export const Switch = React.forwardRef(factory("switch"))

Checkbox.displayName = "Checkbox"
Radio.displayName = "Radio"
Switch.displayName = "Switch"