import * as React from "react"
import PropTypes from "prop-types"
import {
    classNames,
    isUndef
} from "../utils"
import {InputCommonProps} from "../Common/CommonPropsInterface"
import CustomFeedback from "../Form/CustomFeedback"

let uuid = 0

export interface CustomControlProps extends InputCommonProps<HTMLInputElement> {
    inline?: boolean
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
            ...otherProps
        }: CustomControlProps,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const PREFIX = "custom-control"
        const _type = type === "switch" ? "checkbox" : type
        let _id = id

        if (isUndef(id)) {
            _id = `bs-custom-control-${uuid++}`
        }

        const _label = (
            <label
                htmlFor={_id}
                className={`${PREFIX}-label`}>
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
                    className={`${PREFIX}-input`}
                    {...otherProps} />
                {_label}
                <CustomFeedback />
            </div>
        )
    })

CustomControl.propTypes = {
    inline: PropTypes.bool
}
CustomControl.displayName = "CustomControl"

export default CustomControl