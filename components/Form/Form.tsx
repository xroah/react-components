import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames, handleFuncProp
} from "../utils"
import {ColProps} from "../Layout/Col"
import {FormContext} from "../Common/contexts"
import {FormCommonProps} from "../Common/CommonPropsInterface"
import omitProps from "../utils/omitProps"

interface State {
    validated: boolean
}

export interface FormProps extends FormCommonProps<HTMLFormElement> {
    inline?: boolean
    labelCol?: ColProps
    wrapperCol?: ColProps
    horizontal?: boolean
    labelAlign?: "left" | "right"
    onValidate?: (valid: boolean) => void
}

export default class Form extends React.Component<FormProps, State> {
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

    state = {
        validated: false
    }

    private formRef = React.createRef<HTMLFormElement>()

    handleSubmit = (evt: React.FormEvent) => {
        const {
            noValidate,
            onValidate
        } = this.props

        if (!noValidate) {
            const {
                current: form
            } = this.formRef

            if (form) {
                handleFuncProp(onValidate)(form.checkValidity())
            }

            evt.preventDefault()
            evt.stopPropagation()
            this.setState({
                validated: true
            })
        }
    }

    reset() {
        this.formRef.current?.reset()
        this.setState({
            validated: false
        })
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
            ...otherProps
        } = this.props
        const classes = classNames(
            className,
            inline && "form-inline",
            this.state.validated && "was-validated"
        )

        omitProps(otherProps, ["onValidate"])

        return (
            <FormContext.Provider value={{
                labelCol,
                wrapperCol,
                horizontal,
                labelAlign
            }}>
                <form
                    ref={this.formRef}
                    noValidate={!noValidate}
                    onSubmit={this.handleSubmit}
                    className={classes}
                    {...otherProps} />
            </FormContext.Provider>
        )
    }
}