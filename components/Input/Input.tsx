import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"
import {
    FormItemContext, InputGroupContext
} from "../Common/contexts"
import InputGroup from "./InputGroup"
import {InputCommonProps} from "../Common/CommonPropsInterface"
import Text from "./Text"
import {handleFeedback} from "../Form/Item"

export interface InputProps extends InputCommonProps<HTMLInputElement & HTMLTextAreaElement> {
    prepend?: React.ReactNode
    append?: React.ReactNode
    sizing?: "lg" | "sm"
    variant?: "input" | "textarea"
    plaintext?: boolean
}

function handleAddon(addon: any) {
    if (!React.isValidElement(addon)) {
        return <Text>{addon}</Text>
    }

    return addon
}

const Input = React.forwardRef(
    (
        {
            className = "",
            prepend,
            append,
            sizing,
            type = "text",
            children,
            variant,
            plaintext,
            ...otherProps
        }: InputProps,
        ref: React.Ref<HTMLInputElement & HTMLTextAreaElement>
    ) => {
        const PREFIX = "form-control"
        const noAppendix = isUndef(prepend) && isUndef(append)
        const classes = classNames(
            className,
            sizing && noAppendix && `${PREFIX}-${sizing}`,
            otherProps.readOnly && plaintext ? `${PREFIX}-plaintext` : PREFIX
        )
        const input = variant === "input" ?
            (
                <input
                    ref={ref}
                    type={type}
                    className={classes}
                    {...otherProps} />
            )
            :
            (
                <textarea
                    ref={ref}
                    className={classes}
                    {...otherProps} />
            )
        const inputWithAddons = (valid: any, invalid: any, tooltip: any) => (
            (
                <>
                    {
                        !isUndef(prepend) && (
                            <div className="input-group-prepend">
                                {handleAddon(prepend)}
                            </div>
                        )
                    }
                    {input}
                    {
                        !isUndef(append) && (
                            <div className="input-group-append">
                                {handleAddon(append)}
                            </div>
                        )
                    }
                    {handleFeedback(valid, tooltip)}
                    {handleFeedback(invalid, tooltip, false)}
                </>
            )
        )

        if (noAppendix) {
            return (
                <FormItemContext.Consumer>
                    {
                        ({
                            valid,
                            invalid,
                            tooltip
                        }) => (
                            <>
                                {input}
                                {handleFeedback(valid, tooltip)}
                                {handleFeedback(invalid, tooltip, false)}
                            </>
                        )
                    }
                </FormItemContext.Consumer>
            )
        }

        return (
            <InputGroupContext.Consumer>
                {
                    // prevent nesting
                    value => (
                        <FormItemContext.Consumer>
                            {
                                ({
                                    invalid,
                                    valid,
                                    tooltip
                                }) => {
                                    const c = inputWithAddons(valid, invalid, tooltip)
                                    
                                    return (
                                        value ?
                                            c :
                                            <InputGroup size={sizing}>{c}</InputGroup>
                                    )
                                }
                            }
                        </FormItemContext.Consumer>
                    )
                }
            </InputGroupContext.Consumer>
        )

    }
)

Input.defaultProps = {
    type: "text",
    variant: "input",
    plaintext: false
}
Input.propTypes = {
    prepend: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    append: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    sizing: PropTypes.oneOf(["sm", "lg"]),
    plaintext: PropTypes.bool,
    variant: PropTypes.oneOf(["input", "textarea"])
}
Input.displayName = "Input"

export default Input