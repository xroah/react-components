import * as React from "react"

const Placeholder = React.forwardRef(
    (
        props: React.HTMLAttributes<HTMLDivElement>,
        ref: React.ForwardedRef<HTMLDivElement>
    ) => (
        <div
            className="reap-ui-placeholder"
            style={{display: "none"}}
            {...props}
            ref={ref}>
                This element is a placeholder for finding DOM node of a component,
                due to ReactDOM.findDOMNode has been deprecated in StrictMode.
        </div>
    )
)

Placeholder.displayName = "Placeholder"

export default Placeholder