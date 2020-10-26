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
    validated?: boolean
}

export default class Form extends React.Component<FormProps> {
    static propTypes = {
        inline: PropTypes.bool,
        labelCol: PropTypes.object,
        wrapperCol: PropTypes.object,
        horizontal: PropTypes.bool,
        labelAlign: PropTypes.oneOf(["left", "right"])
    }
    static defaultProps = {
        inline: false,
        horizontal: false,
        noValidate: false
    }

    private formRef = React.createRef<HTMLFormElement>()

    reset() {
        this.formRef.current?.reset()
    }

    render() {
        const {
            className,
            inline,
            labelCol,
            labelAlign,
            wrapperCol,
            horizontal,
            noValidate,
            validated,
            ...otherProps
        } = this.props
        const classes = classNames(
            className,
            inline && "form-inline",
            validated && "was-validated"
        )

        return (
            <FormContext.Provider value={{
                labelCol,
                wrapperCol,
                horizontal,
                labelAlign
            }}>
                <form
                    ref={this.formRef}
                    noValidate={noValidate}
                    className={classes}
                    {...otherProps} />
            </FormContext.Provider>
        )
    }
}