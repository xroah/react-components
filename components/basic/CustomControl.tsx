import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

let uuid = 0;

export interface CustomControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
            ...otherProps
        }: CustomControlProps,
        ref
    ) => {
        const PREFIX = "custom-control";
        let _props: any = {
            ...otherProps
        };
        let _type = type === "switch" ? "checkbox" : type;
        let _id = id;
        let htmlFor = "";
        let _label: React.ReactElement | null = null;

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
                classNames(
                    PREFIX,
                    `custom-${type}`,
                    inline && `${PREFIX}-inline`
                )
            }>
                <input
                    type={_type}
                    id={_id}
                    ref={ref}
                    className={
                        classNames(className, `${PREFIX}-input`)
                    }
                    {..._props} />
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