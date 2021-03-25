import * as React from "react"

const Placeholder = React.forwardRef(
    (
        props: React.HTMLAttributes<HTMLDivElement>,
        ref: React.ForwardedRef<HTMLDivElement>
    ) => (
        <div
            className="reap-transition-placeholder"
            style={{display: "none"}}
            {...props}
            ref={ref} />
    )
)

Placeholder.displayName = "Placeholder"

export default Placeholder