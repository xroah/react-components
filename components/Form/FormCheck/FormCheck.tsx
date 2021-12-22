import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {getPrefixFunc} from "../../Commons/utils"
import {bool, string} from "prop-types"
import {InputAttrs, ValueOf} from "../../Commons/consts-and-types"
import {isValidNode} from "reap-utils/lib/react"

let uuid = 0

const types = ["checkbox", "radio"] as const

type Type = ValueOf<typeof types>
type Base = Omit<InputAttrs, "type">

export interface FormCheckProps extends Base {
    inline?: boolean
    inputId?: string
    label?: string
}

type InternalOnly = {
    type: Type,
    switch?: boolean
}

const FormCheck = React.forwardRef(
    (
        {
            id,
            className,
            inline,
            inputId,
            children,
            switch: s,
            label,
            ...restProps
        }: FormCheckProps & InternalOnly,
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const prefix = getPrefixFunc("form-check")
        const ID_PREFIX = "bs-form-check-"
        const _id = inputId === undefined ?
            `${ID_PREFIX}${uuid++}` : inputId
        const classes = classNames(
            className,
            prefix(),
            inline && prefix("inline"),
            s && "form-switch"
        )

        return (
            <div id={id} className={classes}>
                <input
                    className={prefix("input")}
                    ref={ref}
                    id={_id}
                    {...restProps} />
                {
                    isValidNode(label) && (
                        <label
                            htmlFor={_id}
                            className={prefix("label")}>
                            {label}
                        </label>
                    )
                }
                {/* children for feedbacks or something else */}
                {children}
            </div>
        )
    }
)

export default function createCheckComponent(
    type: Type,
    displayName: string,
    isSwitch?: boolean
) {
    const Component = React.forwardRef(
        (
            props: FormCheckProps,
            ref: React.ForwardedRef<HTMLInputElement>
        ) => (
            <FormCheck
                ref={ref}
                type={type}
                switch={isSwitch}
                {...props} />
        )
    )

    Component.displayName = displayName

    return Component
}

FormCheck.propTypes = {
    inline: bool,
    inputId: string
}
