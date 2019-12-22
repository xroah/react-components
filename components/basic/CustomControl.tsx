import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

let uuid = 0;

export interface CustomControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
    inline?: boolean;
    indeterminate?: boolean;
    //internal only, prevent 'FormItem' from adding 'form-control' class
    __noControl__?: boolean;
}

export default function CustomControl(props: CustomControlProps) {
    const {
        type,
        inline,
        id,
        className,
        children,
        indeterminate,
        ...otherProps
    } = props;
    const PREFIX = "custom-control";
    let _props: any = {
        ...otherProps
    };
    let _type = type === "switch" ? "checkbox" : type;
    let _id = id;
    let htmlFor = "";
    let _label: React.ReactElement | null = null;

    delete otherProps.__noControl__;

    if (!_id) {
        htmlFor = _id = `bs-custom-control-${uuid++}`;
    } else {
        htmlFor = _id;
    }

    _label = (
        <label
            htmlFor={htmlFor}
            className={`${PREFIX}-label`}>
            {children}
        </label>
    );

    return (
        <div className={
            classNames(PREFIX, `custom-${type}`, inline && `${PREFIX}-inline`)
        }>
            <input
                type={_type}
                id={_id}
                className={
                    classNames(className, `${PREFIX}-input`)
                }
                {..._props} />
            {_label}
        </div>
    );
}

function factory(type: string) {
    return function (props: CustomControlProps) {
        return (
            <CustomControl
                type={type}
                {...props} />
        );
    }
}

export const Checkbox: any = factory("checkbox");
Checkbox.displayName = "Checkbox;"

export const Radio: any = factory("radio");
Radio.displayName = "Radio;"

export const Switch: any = factory("switch");
Switch.displayName = "Switch;"

CustomControl.propTypes = {
    inline: PropTypes.bool,
    indeterminate: PropTypes.bool
};