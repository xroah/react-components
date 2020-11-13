import * as React from "react"
import CustomControl, {CustomControlProps} from "./CustomControl"

function factory(type: string) {
    const Component = React.forwardRef((props: CustomControlProps, ref: React.Ref<any>) => {
        return (
            <CustomControl
                type={type}
                ref={ref}
                {...props} />
        )
    })
    const firstLetter = type.charAt(0)
    Component.displayName = type.replace(firstLetter, firstLetter.toUpperCase())

    return Component
}

export const Checkbox = factory("checkbox")
export const Radio = factory("radio")
export const Switch = factory("switch")