import * as React from "react"
import Col, {ColProps} from "../Layout/Col"
import {FormContext} from "../Common/contexts"
import CustomControl from "../CustomControl/CustomControl"

interface WrapperProps extends React.HTMLAttributes<HTMLElement> {
    wrapperCol?: ColProps
    help?: string | React.ReactNode
    validText?: string | React.ReactNode
    invalidText?: string | React.ReactNode
}

export default function Wrapper(props: WrapperProps) {
    const {
        children,
        wrapperCol,
        help,
        validText,
        invalidText
    } = props

    console.log(children)

    return (
        <FormContext.Consumer>
            {
                ({
                    wrapperCol: contextWrapperCol
                }: any) => {
                    const _wrapperCol = wrapperCol || contextWrapperCol || {
                        span: false
                    }

                    return (
                        <Col {..._wrapperCol}>
                            {children}
                            {
                                help &&
                                <small className="form-text text-muted">{help}</small>
                            }
                            {
                                validText && (
                                    <div className="valid-feedback">{validText}</div>
                                )
                            }
                            {
                                invalidText && (
                                    <div className="invalid-feedback">{invalidText}</div>
                                )
                            }
                        </Col>
                    )
                }
            }
        </FormContext.Consumer>
    )
}
