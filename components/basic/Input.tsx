import * as React from "react";
import PropTypes from "prop-types";
import { classNames, createComponentByClass } from "../utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    sizing?: "lg" | "sm";
}

function handleAddon(addon: any) {
    if (!React.isValidElement(addon)) {
        return <Input.Text>{addon}</Input.Text>;
    }

    return addon;
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
            ...otherProps
        }: InputProps,
        ref: React.Ref<HTMLInputElement>
    ) => {
        const PREFIX = "form-control";
        const GROUP_PREFIX = "input-group";
        const classes = classNames(className, PREFIX);
        const input = (
            <input
                ref={ref}
                type={type}
                className={classes}
                {...otherProps} />
        );

        if (prepend == undefined && append == undefined) {
            return React.cloneElement(
                input,
                {
                    className: classNames(classes, sizing && `${PREFIX}-${sizing}`)
                }
            );
        }

        return (
            <div className={
                classNames(
                    GROUP_PREFIX,
                    sizing && `${GROUP_PREFIX}-${sizing}`
                )
            }>
                {
                    prepend != undefined && (
                        <div className="input-group-prepend">
                            {handleAddon(prepend)}
                        </div>
                    )
                }
                {input}
                {
                    append != undefined && (
                        <div className="input-group-append">
                            {handleAddon(append)}
                        </div>
                    )
                }
            </div>
        );

    }
) as any;

Input.defaultProps = {
    type: "text"
};
Input.propTypes = {
    type: PropTypes.string,
    prepend: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    append: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
};
Input.displayName = "Input";

Input.Text = createComponentByClass({
    displayName: "InputGroupText",
    className: "input-group-text",
    tag: "span"
});

export default Input;