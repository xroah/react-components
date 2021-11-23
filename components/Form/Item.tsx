import * as React from "react"
import {
    bool,
    node,
    string
} from "prop-types"
import classNames from "reap-utils/lib/class-names"
import {FormCommon, FormWrapper} from "../Commons/consts-and-types"
import {getBreakpointClasses, isValidNode} from "../Commons/utils"
import {FormContext, wrapperPropType} from "./Form"
import Col from "../Layout/Col"

interface FormItemProps extends FormCommon,
    React.HTMLAttributes<HTMLElement> {
    label?: string
    htmlFor?: string
    help?: React.ReactNode
    validFeedback?: React.ReactNode
    invalidFeedback?: React.ReactNode
    tooltip?: boolean
    wrapper?: FormWrapper
}

function getFeedback(
    children: React.ReactNode,
    valid = true,
    tooltip = false
) {
    const prefix = valid ? "valid" : "invalid"
    const suffix = tooltip ? "tooltip" : "feedback"

    return (
        <div className={`${prefix}-${suffix}`}>
            {children}
        </div>
    )
}

export default function FormItem(
    {
        labelAlign,
        labelCol,
        labelSize,
        label,
        help,
        validFeedback,
        invalidFeedback,
        tooltip,
        children,
        htmlFor,
        wrapper,
        itemCol,
        ...restProps
    }: FormItemProps
) {
    const render = (
        {
            labelAlign: ctxLabelAlign,
            labelCol: ctxLabelCol,
            labelSize: ctxLabelSize,
            itemCol: ctxItemCol,
            itemWrapper: ctxWrapper
        }: FormCommon
    ) => {
        const LABEL_CLASS = "form-label"
        const colClasses = `col-${LABEL_CLASS}`
        const _labelAlign = labelAlign === undefined ? ctxLabelAlign : labelAlign
        const _labelCol = labelCol === undefined ? ctxLabelCol : labelAlign
        const _labelSize = labelSize === undefined ? ctxLabelSize : labelSize
        const _itemCol = itemCol === undefined ? ctxItemCol : itemCol
        const _wrapper = wrapper === undefined ?
            ctxWrapper === undefined ? "div" : ctxWrapper
            : wrapper
        const bpClasses = _labelCol ? getBreakpointClasses("col", _labelCol) : ""
        const labelClasses = classNames(
            _labelAlign && `text-${_labelAlign}`,
            _labelCol ? `${bpClasses} ${colClasses}` : LABEL_CLASS,
            _labelCol && _labelSize && `${colClasses}-${_labelSize}`
        )
        const c = (
            <>
                {children}
                {
                    isValidNode(help) && (
                        <div className="form-text">{help}</div>
                    )
                }
                {
                    isValidNode(validFeedback) && (
                        getFeedback(validFeedback, true, tooltip)
                    )
                }
                {
                    isValidNode(invalidFeedback) && (
                        getFeedback(invalidFeedback, false, tooltip)
                    )
                }
            </>
        )
        const el = (
            <>
                {
                    isValidNode(label) && (
                        <label className={labelClasses}>
                            {label}
                        </label>
                    )
                }
                {
                    _itemCol ? (
                        <Col span={_itemCol}>
                            {c}
                        </Col>
                    ) : c
                }
            </>
        )

        if (_wrapper) {
            let w: React.ReactElement | null = null
            const props = {
                children: el,
                ...restProps
            }

            if (React.isValidElement(_wrapper)) {
                w = React.cloneElement(_wrapper, props)
            } else {
                w = React.createElement(_wrapper, props)
            }

            return w
        }

        return el
    }

    return (
        <>
            <FormContext.Consumer>
                {render}
            </FormContext.Consumer>

        </>
    )
}

FormItem.propTypes = {
    label: string,
    htmlFor: string,
    help: node,
    validFeedback: node,
    invalidFeedback: node,
    tooltip: bool,
    wrapper: wrapperPropType
}