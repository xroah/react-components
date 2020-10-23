import * as React from "react"
import PropTypes from "prop-types"
import {ColProps} from "../Layout/Col"
import {classNames} from "../utils"
import {
    FormContext,
    FormItemContext
} from "../Common/contexts"
import {CommonProps} from "../Common/CommonPropsInterface"
import Label from "./Label"
import Wrapper, {
    handleFeedback, 
    handleHelp
} from "./Wrapper"

export interface FormItemProps extends CommonProps<HTMLElement> {
    horizontal?: boolean
    wrapperCol?: ColProps
    label?: boolean
    labelText?: React.ReactNode
    labelCol?: ColProps
    labelAlign?: "left" | "right"
    htmlFor?: string
    help?: string
    control?: boolean
    validText?: React.ReactNode
    invalidText?: React.ReactNode
    validationTooltip?: boolean
}

export {
    handleFeedback,
    handleHelp
}

export default function FormItem(props: FormItemProps) {
    const {
        horizontal,
        className,
        children,
        htmlFor,
        label,
        labelText,
        labelCol,
        wrapperCol,
        help,
        control,
        labelAlign,
        validText,
        invalidText,
        validationTooltip,
        ...otherProps
    } = props
    let _for: string = htmlFor || ""
    let _label: React.ReactElement | null = null
    let child = React.Children.only(children)
    const context = React.useContext(FormContext)
    const h = horizontal || context.horizontal || false

    if (React.isValidElement(children)) {
        let {
            id,
            className: cls,
            ...otherChildrenProps
        } = children.props as any
        const PREFIX = "form-control"

        if (id) {
            if (!_for) {
                _for = id
            }
        }
        else if (_for) {
            id = _for
        }

        child = React.cloneElement(
            children,
            {
                id,
                className: classNames(
                    cls,
                    control && PREFIX
                ),
                ...otherChildrenProps
            }
        )
    }

    if (labelText) {
        const labelProps = {
            htmlFor: _for || undefined,
            horizontal,
            labelCol,
            labelAlign,
            label
        }
        _label = <Label {...labelProps}>{labelText}</Label>
    }

    return (
        <FormItemContext.Provider value={{
            valid: validText,
            invalid: invalidText,
            tooltip: validationTooltip,
            help
        }}>
            <div className={
                classNames(
                    className,
                    "form-group",
                    h && "row"
                )
            } {...otherProps}>
                {_label}
                <Wrapper
                    wrapperCol={wrapperCol}
                    help={help}
                    valid={validText}
                    invalid={invalidText}
                    tooltip={validationTooltip}>
                    {child}
                </Wrapper>
            </div>
        </FormItemContext.Provider>
    )
}

FormItem.propTypes = {
    horizontal: PropTypes.bool,
    labelText: PropTypes.node,
    label: PropTypes.bool,
    labelCol: PropTypes.object,
    labelAlign: PropTypes.oneOf(["left", "right"]),
    wrapperCol: PropTypes.object,
    htmlFor: PropTypes.string,
    help: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    validText: PropTypes.node,
    invalidText: PropTypes.node,
    validationTooltip: PropTypes.bool
}
FormItem.defaultProps = {
    control: false,
    label: true,
    validationTooltip: false
}