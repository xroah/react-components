import * as React from "react"

function Breadcrumb(
    {
        className,
        children,
        ...restProps
    }: React.HTMLAttributes<HTMLElement>
) {
    return (
        <nav className={className} {...restProps}>
            <ol className="breadcrumb">
                {children}
            </ol>
        </nav>
    )
}

export default Breadcrumb