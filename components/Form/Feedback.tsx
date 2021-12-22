import {bool, string} from "prop-types"
import * as React from "react"
import {isValidNode} from "reap-utils/lib/react"
import {DivAttrs} from "../Commons/consts-and-types"
import {FormContext} from "./Form"

interface FeedbackProps extends DivAttrs {
    valid?: string
    invalid?: string
    tooltip?: boolean
}

export default function Feedback(
    {
        className,
        valid,
        invalid,
        tooltip,
        ...restProps
    }: FeedbackProps
) {
    return (
        <FormContext.Consumer>
            {
                ({feedbackTooltip: ctxTooltip}) => {
                    const getEl = (
                        msg?: string,
                        tooltip?: boolean,
                        prefix = "valid"
                    ) => {
                        const suffix = tooltip ? "tooltip" : "feedback"

                        if (isValidNode(msg)) {
                            return (
                                <div
                                    className={`${prefix}-${suffix}`}
                                    {...restProps}>
                                    {msg}
                                </div>
                            )
                        }

                        return null
                    }
                    const _tooltip = tooltip || ctxTooltip

                    return (
                        <>
                            {getEl(valid, _tooltip)}
                            {getEl(invalid, _tooltip, "invalid")}
                        </>
                    )
                }
            }
        </FormContext.Consumer>
    )
}

Feedback.propTypes = {
    valid: string,
    invalid: string,
    tooltip: bool
}