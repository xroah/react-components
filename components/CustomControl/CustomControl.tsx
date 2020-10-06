import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {InputCommonProps} from "../Common/CommonPropsInterface"

let uuid = 0

export interface CustomControlProps extends InputCommonProps<HTMLInputElement> {
    inline?: boolean
    validText?: string | React.ReactNode
    invalidText?: string | React.ReactNode
    __reapui_custom_control__?: true
}

const CustomControl = React.forwardRef(
    (
        {
            type,
            inline,
            id,
            className,
            children,
            style,
            required,
            validText,
            invalidText,
            __reapui_custom_control__,
            ...otherProps
        }: CustomControlProps,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const PREFIX = "custom-control"
        const _type = type === "switch" ? "checkbox" : type
        let _id = id
        let _label: React.ReactElement | null = null

        if (!_id) {
            _id = `bs-custom-control-${uuid++}`
        }

        _label = (
            <label
                htmlFor={_id}
                className={
                    classNames(
                        `${PREFIX}-label`,
                        required && "form-check-label"
                    )
                }>
                {children}
            </label>
        )

        return (
            <div
                className={
                    classNames(
                        className,
                        PREFIX,
                        `custom-${type}`,
                        inline && `${PREFIX}-inline`
                    )
                }
                style={style}>
                <input
                    type={_type}
                    id={_id}
                    ref={ref}
                    required={required}
                    className={
                        classNames(
                            `${PREFIX}-input`,
                            required && "form-check-input"
                        )
                    }
                    {...otherProps} />
                {_label}
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
            </div>
        )
    })

CustomControl.propTypes = {
    inline: PropTypes.bool
}

export default CustomControl