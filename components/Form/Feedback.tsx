import {bool, string} from "prop-types"
import * as React from "react"
import classNames from "reap-utils/lib/class-names"
import {isValidNode} from "../Commons/utils"

interface FeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
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
    const getEl = (msg?: string, tooltip?: boolean, prefix = "valid") => {
        const suffix = tooltip ? "tooltip" : "feedback"

        if (isValidNode(msg)) {
            return (
                <div className={`${prefix}-${suffix}`} {...restProps}>
                    {msg}
                </div>
            )
        }

        return null
    }

    return (
        <>
            {getEl(valid, tooltip)}
            {getEl(invalid, tooltip, "invalid")}
        </>
    )
}

Feedback.propTypes = {
    valid: string,
    invalid: string,
    tooltip: bool
}