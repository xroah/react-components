import * as React from "react";
import PropTypes from "prop-types";
import {
    CommonProps,
    commonPropTypes,
    handleProps
} from "./Button";
import { InputCommonProps } from "../../CommonPropsInterface";
import { ToggleButtonGroupContext } from "../../contexts";
import { classNames, chainFunction } from "../../utils";

export interface ToggleButtonProps extends InputCommonProps<HTMLInputElement>, CommonProps {
    type?: "checkbox" | "radio"
}

const ToggleButton = React.forwardRef(
    (
        {
            children,
            style = {},
            onFocus,
            onBlur,
            checked,
            type,
            defaultChecked,
            ...otherProps
        }: ToggleButtonProps,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const {
            className,
            ...props
        } = handleProps(otherProps);
        const [focused, updateFocus] = React.useState(false);
        const handleBlur = () => updateFocus(false);
        const handleFocus = () => updateFocus(true);

        if (props.disabled) {
            style.pointerEvents = "none";
            style.cursor = "default";
        }

        return (
            <ToggleButtonGroupContext.Consumer>
                {
                    ({ type: ctxType }) => (
                        <label
                            style={style}
                            className={
                                classNames(
                                    className,
                                    focused && "focus",
                                    (checked || defaultChecked) && "active"
                                )
                            }>
                            <input
                                ref={ref}
                                type={type || ctxType}
                                onFocus={chainFunction(handleFocus, onFocus)}
                                onBlur={chainFunction(handleBlur, onBlur)}
                                {...props} />
                            {children}
                        </label>
                    )
                }
            </ToggleButtonGroupContext.Consumer>
        );
    }
);

ToggleButton.propTypes = {
    ...commonPropTypes,
    type: PropTypes.oneOf(["checkbox", "radio"])
};
ToggleButton.defaultProps = {
    variant: "primary"
};

export default ToggleButton; 