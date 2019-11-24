import * as React from "react";
import PropTypes from "prop-types";
import { classNames, createComponentByClass } from "../utils";

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
        const classes = classNames(className, "form-control");
        const input = (
            <input
                ref={ref}
                type={type}
                className={classes}
                {...otherProps} />
        );
        const inputWithAddons = (<>
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
        </>);
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

Input.Group = function InputGroup(props: React.HTMLAttributes<HTMLElement>) {
    const {
        children,
        className,
        ...otherProps
    } = props;
    //prevent 'input-group' from nesting
    const _children = React.Children.map(children, c => {
        if (React.isValidElement(c)) {
            const type = c.type as any;

            if (
                typeof type === "object" &&
                type.Group === InputGroup &&
                (c.props.prepend != undefined ||
                    c.props.append != undefined)
            ) {
                return React.cloneElement(c, { __isGroupChild__: true });
            }

            return c;
        }

        return c;
    });

    return (
        <div
            className={classNames(className, "input-group")}
            {...otherProps}>
            {_children}
        </div>
    );
}

export default Input;