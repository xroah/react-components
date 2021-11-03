import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc, isValidNode} from "@commons/utils"
import {bool, string} from "prop-types"

let uid = 0

export interface FormCheckProps extends
    React.InputHTMLAttributes<HTMLInputElement> {
    inline?: boolean
    inputId?: string
}

const FormCheck = React.forwardRef(
    (
        {
            id,
            style,
            className,
            inline,
            inputId,
            children,
            switch: s,
            ...restProps
        }: FormCheckProps & {switch?: boolean},
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const prefix = getPrefixFunc("form-check")
        const _id = (
            inputId === undefined ?
                `form-check-${uid++}` :
                inputId
        )
        const classes = classNames(
            className,
            prefix(),
            inline && prefix("inline"),
            s && "form-switch"
        )

        return (
            <div 
            id={id} 
            style={style}>
                <input
                    className={prefix("input")}
                    ref={ref}
                    id={_id}
                    {...restProps} />
                {
                    isValidNode(children) && (
                        <label htmlFor={_id} className={prefix("label")}>
                            {children}
                        </label>
                    )
                }
            </div>
        )
    }
)

FormCheck.propTypes = {
    inline: bool,
    inputId: string
}