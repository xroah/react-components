import * as React from "react"
import createComponent from "../Commons/create-component"
import {capitalize} from "../Commons/utils"

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