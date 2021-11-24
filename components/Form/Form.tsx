import * as React from "react"
import {FormCommon} from "../Commons/consts-and-types"
import classNames from "reap-utils/lib/class-names"
import {
    bool,
    element,
    elementType,
    oneOf,
    oneOfType
} from "prop-types"
import {formCommPropTypes} from "../Commons/prop-types"

interface FormProps extends FormCommon,
    React.FormHTMLAttributes<HTMLFormElement> {
    validated?: boolean
}

export const FormContext = React.createContext<FormCommon>({})
export const wrapperPropType = oneOfType([
    elementType,
    element,
    oneOf([null])
])

const Form = React.forwardRef(
    (
        {
            className,
            validated,
            labelAlign,
            labelCol,
            labelSize,
            childrenCol,
            itemWrapper,
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
                labelSize,
                childrenCol,
                itemWrapper
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

export default Form