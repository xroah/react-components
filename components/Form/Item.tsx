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
    wrapper?: FormWrapper
}

export default function FormItem(
    {
        labelAlign,
        labelCol,
        labelSize,
        label,
        help,
        children,
        htmlFor,
        wrapper,
        itemCol,
        className,
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
            </>
        )
        const el = (
            <>
                {
                    isValidNode(label) && (
                        <label
                            htmlFor={htmlFor}
                            className={labelClasses}>
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
            const ITEM_CLASS = "form-item"
            const classes = classNames(className, ITEM_CLASS,)

            if (React.isValidElement(_wrapper)) {
                w = React.cloneElement(
                    _wrapper,
                    {
                        className: classNames(
                            _wrapper.props.className,
                            classes
                        ),
                        ...props
                    }
                )
            } else {
                w = React.createElement(
                    _wrapper,
                    {
                        className: classes,
                        ...props
                    }
                )
            }

            return w
        }

        return el
    }

    return (
        <FormContext.Consumer>
            {render}
        </FormContext.Consumer>
    )
}

FormItem.propTypes = {
    label: string,
    htmlFor: string,
    help: node,
    tooltip: bool,
    wrapper: wrapperPropType
}