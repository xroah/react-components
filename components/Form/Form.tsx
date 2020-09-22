import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {ColProps} from "../Layout/Col"
import {FormContext} from "../Common/contexts"
import {FormCommonProps} from "../Common/CommonPropsInterface"

export interface FormProps extends FormCommonProps<HTMLFormElement> {
    inline?: boolean
    labelCol?: ColProps
    wrapperCol?: ColProps
    horizontal?: boolean
    labelAlign?: "left" | "right"
}

export default function Form(props: FormProps) {
    const {
        className,
        inline,
        labelCol,
        labelAlign,
        wrapperCol,
        horizontal,
        ...otherProps
    } = props

    return (
        <FormContext.Provider value={{
            labelCol,
            wrapperCol,
            horizontal,
            labelAlign
        }}>
            <form
                className={
                    classNames(className, inline && "form-inline")
                } {...otherProps} />
        </FormContext.Provider>
    )
}

Form.propTypes = {
    inline: PropTypes.bool,
    labelCol: PropTypes.object,
    wrapperCol: PropTypes.object,
    horizontal: PropTypes.bool,
    labelAlign: PropTypes.oneOf(["left", "right"])
}
Form.defaultProps = {
    inline: false,
    horizontal: false
}