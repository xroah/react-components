import * as React from "react"
import PropTypes from "prop-types"
import {classNames} from "../utils"
import {InputCommonProps} from "../Common/CommonPropsInterface"

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
                className={`${PREFIX}-label`}>
                {children}
            </label>
        )

        return (
            <div className={
                classNames(
                    className,
                    PREFIX,
                    `custom-${type}`,
                    inline && `${PREFIX}-inline`
                )
            } style={style}>
                <input
                    type={_type}
                    id={_id}
                    ref={ref}
                    className={`${PREFIX}-input`}
                    {...otherProps} />
                {_label}
            </div>
        )
    })

CustomControl.propTypes = {
    inline: PropTypes.bool
}

export default CustomControl