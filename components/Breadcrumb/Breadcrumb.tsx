import * as React from "react"

function Breadcrumb(props: React.HTMLAttributes<HTMLElement>) {
    const {
        className,
        children,
        ...restProps 
    } = props

    return (
        <nav className={className} {...restProps}>
            <ol className="breadcrumb">
                {children}
            </ol>
        </nav>
    )
}

export default Breadcrumb