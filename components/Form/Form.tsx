import * as React from "react"
import {FormCommon} from "../Commons/consts-and-types"
import classNames from "reap-utils/lib/class-names"
import {bool} from "prop-types"
import {formCommPropTypes} from "../Commons/prop-types"

interface FormProps extends FormCommon,
    React.FormHTMLAttributes<HTMLFormElement> {
    validated?: boolean
}

export const FormContext = React.createContext<FormCommon>({})

const Form = React.forwardRef(
    (
        {
            className,
            validated,
            labelAlign,
            labelCol,
            labelSize,
            ...restProps
        }: FormProps,
        ref: React.ForwardedRef<HTMLFormElement>
    ) => {
        const classes = classNames(
            className,
            validated && "was-validated"
        )

        return (
            <FormContext.Provider value={{
                labelAlign,
                labelCol,
                labelSize
            }}>
                <form
                    ref={ref}
                    className={classes}
                    {...restProps} />
            </FormContext.Provider>
        )
    }
)

Form.propTypes = {
    validated: bool,
    ...formCommPropTypes
}