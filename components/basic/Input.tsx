import * as React from "react";
import PropTypes from "prop-types";
import { classNames, createComponentByClass } from "../utils";
import { InputGroupContext } from "../contexts";
import InputGroup from "./InputGroup";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    sizing?: "lg" | "sm";
    variant?: "input" | "textarea"
    plaintext?: boolean;
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
            variant,
            plaintext,
            ...otherProps
        }: InputProps,
        ref: React.Ref<HTMLInputElement & HTMLTextAreaElement>
    ) => {
        const PREFIX = "form-control";
        const classes = classNames(
            className,
            sizing && `${PREFIX}-${sizing}`,
            otherProps.readOnly && plaintext ? `${PREFIX}-plaintext` : PREFIX
        );
        const input = variant === "input" ? (
            <input
                ref={ref}
                type={type}
                className={classes}
                {...otherProps} />
        ) : (
                <textarea
                    ref={ref}
                    className={classes}
                    {...otherProps} />
            );
        const inputWithAddons = (
            <>
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
            </>
        );

        if (prepend == undefined && append == undefined) {
            return input;
        }

        return (
            <InputGroupContext.Consumer>
                {
                    // prevent nesting
                    value => (
                        value ?
                            inputWithAddons :
                            <InputGroup>{inputWithAddons}</InputGroup>
                    )
                }
            </InputGroupContext.Consumer>
        );

    }
) as any;

Input.defaultProps = {
    type: "text",
    variant: "input",
    plaintext: false
};
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
};
Input.displayName = "Input";

Input.Text = createComponentByClass({
    displayName: "InputGroupText",
    className: "input-group-text",
    tag: "span"
});
Input.Group = InputGroup;

export default Input;