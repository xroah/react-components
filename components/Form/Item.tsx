import * as React from "react"
import PropTypes from "prop-types"
import {ColProps} from "../Layout/Col"
import {classNames} from "../utils"
import {FormContext} from "../Common/contexts"
import {CommonProps} from "../Common/CommonPropsInterface"
import Label from "./Label"
import Wrapper from "./Wrapper"

export interface FormItemProps extends CommonProps<HTMLElement> {
    horizontal?: boolean
    wrapperCol?: ColProps
    label?: boolean
    labelText?: string | React.ReactNode
    labelCol?: ColProps
    labelAlign?: "left" | "right"
    htmlFor?: string
    help?: string
    control?: boolean
    validText?: string | React.ReactNode
    invalidText?: string | React.ReactNode
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
        ...otherProps
    } = props
    let _for: string = htmlFor || ""
    let _label: React.ReactElement | null = null
    let _children = children
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

        _children = React.cloneElement(
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
                validText={validText}
                invalidText={invalidText}>
                {_children}
            </Wrapper>
        </div>
    )
}

FormItem.propTypes = {
    horizontal: PropTypes.bool,
    labelText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    label: PropTypes.bool,
    labelCol: PropTypes.object,
    labelAlign: PropTypes.oneOf(["left", "right"]),
    wrapperCol: PropTypes.object,
    htmlFor: PropTypes.string,
    help: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}
FormItem.defaultProps = {
    control: false,
    label: true
}