import * as React from "react"
import Col, {ColProps} from "../Layout/Col"
import {FormContext} from "../Common/contexts"

interface WrapperProps extends React.HTMLAttributes<HTMLElement> {
    wrapperCol?: ColProps
    help?: React.ReactNode
    valid?: React.ReactNode
    invalid?: React.ReactNode
    tooltip?: boolean
}
export function handleFeedback(
    text: React.ReactNode,
    tooltip = false,
    valid = true
) {
    let className: string

    if (tooltip) {
        className = valid ? "valid-tooltip" : "invalid-tooltip"
    } else {
        className = valid ? "valid-feedback" : "invalid-feedback"
    }

    return text ? <div className={className}>{text}</div> : null
}

export function getFeedbacks(
    valid: any,
    invalid: any,
    tooltip: any
) {
    return (
        <>
            {handleFeedback(valid, tooltip)}
            {handleFeedback(invalid, tooltip, false)}
        </>
    )
}

export function handleHelp(help: React.ReactNode) {
    return help ? (
        <small className="form-text text-muted w-100">
            {help}
        </small>
    ) : null
}

export default function Wrapper(props: WrapperProps) {
    const {
        children,
        wrapperCol,
        help,
        valid,
        invalid,
        tooltip
    } = props
    const c = children as React.ReactElement

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
                            {
                                typeof c.type === "string" ?
                                    (
                                        //html element rather than a react component
                                        <>
                                            {c}
                                            {getFeedbacks(valid, invalid, tooltip)}
                                        </>
                                    ) : c//handled by context
                            }
                            {handleHelp(help)}
                        </Col>
                    )
                }
            }
        </FormContext.Consumer>
    )
}
