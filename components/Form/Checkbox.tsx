import * as React from "react"
import FormCheck, {FormCheckProps} from "./FormCheck"

const Checkbox = React.forwardRef(
    (
        props: FormCheckProps,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <FormCheck
                ref={ref}
                type="checkbox"
                {...props} />
        )
    }
)

Checkbox.displayName = "Checkbox"

export default Checkbox