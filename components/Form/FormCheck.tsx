import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc, isValidNode} from "@commons/utils"
import {
    bool,
    oneOf,
    string
} from "prop-types"
import {ValueOf} from "@commons/consts-and-types"

let uid = 0

const types = ["checkbox", "radio"] as const

type BaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
type Type = ValueOf<typeof types>

export interface FormCheckProps extends BaseProps {
    inline?: boolean
    inputId?: string
}

type InternalOnly = {
    type: Type,
    switch: boolean
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
        }: FormCheckProps & InternalOnly,
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
                style={style}
                className={classes}>
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

export default FormCheck