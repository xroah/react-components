import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "./utils";
import { InputCommonProps } from "./CommonPropsInterface";

let uuid = 0;

export interface CustomControlProps extends InputCommonProps<HTMLInputElement> {
    inline?: boolean;
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
        const PREFIX = "custom-control";
        let _type = type === "switch" ? "checkbox" : type;
        let _id = id;
        let _label: React.ReactElement | null = null;

        if (!_id) {
            _id = `bs-custom-control-${uuid++}`;
        }

        _label = (
            <label
                htmlFor={_id}
                className={`${PREFIX}-label`}>
                {children}
            </label>
        );

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
        );
    });

function factory(type: string) {
    return function (props: CustomControlProps, ref: React.Ref<any>) {
        return (
            <CustomControl
                type={type}
                ref={ref}
                {...props} />
        );
    }
}


export const Checkbox = React.forwardRef(factory("checkbox"));
export const Radio = React.forwardRef(factory("radio"));
export const Switch = React.forwardRef(factory("switch"));

Checkbox.displayName = "Checkbox";
Radio.displayName = "Radio";
Switch.displayName = "Switch";


CustomControl.propTypes = {
    inline: PropTypes.bool
};