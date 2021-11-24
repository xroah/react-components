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

function get<P, C>(prop?: P, ctx?: C): P | C | undefined {
    return prop === undefined ? ctx : prop
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
        childrenCol,
        className,
        ...restProps
    }: FormItemProps
) {
    const render = (
        {
            labelAlign: ctxLabelAlign,
            labelCol: ctxLabelCol,
            labelSize: ctxLabelSize,
            childrenCol: ctxCCol,
            itemWrapper: ctxWrapper
        }: FormCommon
    ) => {
        const LABEL_CLASS = "form-label"
        const colClasses = `col-${LABEL_CLASS}`
        const _labelAlign = get(labelAlign, ctxLabelAlign)
        const _labelCol = get(labelCol, ctxLabelCol)
        const _labelSize = get(labelSize, ctxLabelSize)
        const _itemCol = get(childrenCol, ctxCCol)
        const _wrapper = wrapper === undefined ?
            ctxWrapper === undefined ?
                "div" :
                ctxWrapper :
            wrapper
        const bpClasses = _labelCol ?
            getBreakpointClasses("col", _labelCol) : ""
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
            // bootstrap doesn't have any styles of this class,
            // just for custom styles
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