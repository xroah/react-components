import * as React from "react"
import {createComponent} from "reap-utils/lib/react"
import {capitalize} from "reap-utils/lib"

const CLASS_NAME = "breadcrumb"

export default createComponent<React.HTMLAttributes<HTMLElement>>({
    displayName: capitalize(CLASS_NAME),
    render(
        className,
        {
            children,
            ...restProps
        }
    ) {
        return (
            <nav className={className} {...restProps}>
                <ol className={CLASS_NAME}>
                    {children}
                </ol>
            </nav>
        )
    }
})