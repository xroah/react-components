import * as React from "react"
import Col, {ColProps} from "../Layout/Col"
import {FormContext} from "../Common/contexts"

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    horizontal?: boolean
    label?: boolean
    labelCol?: ColProps
    labelAlign?: "left" | "right"
    htmlFor?: string
}

export default function Label(props: LabelProps) {
    const {
        children,
        labelCol,
        label,
        labelAlign,
        htmlFor,
        horizontal
    } = props

    return (
        <FormContext.Consumer>
            {
                ({
                    labelCol: contextLabelCol,
                    labelAlign: contextLabelAlign,
                    horizontal: contextHorizontal
                }: any) => {
                    const _labelCol = labelCol || contextLabelCol || {
                        span: false
                    }
                    const _labelAlign = labelAlign || contextLabelAlign
                    const h = horizontal || contextHorizontal || false
                    const colCls = _labelAlign === "right" ? "text-right" : undefined
                    const labelCls = h ? "col-form-label" : undefined

                    return (
                        <Col
                            className={colCls}
                            {..._labelCol}>
                            {
                                label ?
                                    <label htmlFor={htmlFor} className={labelCls}>{children}</label> :
                                    children
                            }
                        </Col>
                    )
                }
            }
        </FormContext.Consumer>
    )
}
