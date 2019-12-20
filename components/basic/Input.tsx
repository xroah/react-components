import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";
import InputGroup from "./InputGroup";

export interface InputProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    type?: string;
    __isGroupChild__?: boolean;
}

const Input = React.forwardRef(
    ({
        className,
        prepend,
        append,
        __isGroupChild__,
        type = "text",
        children,
        ...otherProps
    }: InputProps, ref: React.Ref<HTMLInputElement>) => {
        const classes = classNames(className, className?.includes("form-control") ? "" : "form-control");
        const input = (
            <input
                ref={ref}
                type={type}
                className={classes}
                {...otherProps} />
        );
        const inputWithAddons = (
            <>
                {
                    prepend != undefined && (
                        <div className="input-group-prepend">
                            {prepend}
                        </div>
                    )
                }
                {input}
                {
                    append != undefined && (
                        <div className="input-group-append">
                            {append}
                        </div>
                    )
                }
            </>
        );
        if (prepend == undefined && append == undefined) {
            return input;
        }

        return __isGroupChild__ ?
            inputWithAddons :
            <Input.Group>
                {inputWithAddons}
            </Input.Group>

    }
) as any;

Input.defaultProps = {
    type: "text"
};
Input.propTypes = {
    type: PropTypes.string,
    prepend: PropTypes.node,
    append: PropTypes.node
};
Input.displayName = "Input";

Input.Group = InputGroup;

export default Input;