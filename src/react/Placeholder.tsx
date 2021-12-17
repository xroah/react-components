import * as React from "react"

const Placeholder = React.forwardRef(
    (
        _: object,
        ref: React.ForwardedRef<HTMLDivElement>
    ) => (
        <div style={{display: "none"}} ref={ref}>
            This element is a placeholder for finding DOM node of a component,
            due to ReactDOM.findDOMNode has been deprecated in StrictMode.
        </div>
    )
)

Placeholder.displayName = "Placeholder"

export default Placeholder