import * as React from "react";
import PropTypes from "prop-types";
import { classNames } from "../utils";

export interface InputGroupProps extends React.HTMLAttributes<HTMLElement> {
    size?: "sm" | "lg";
}

export default function InputGroup(props: InputGroupProps) {
    const {
        children,
        className,
        size,
        ...otherProps
    } = props;
    const PREFIX = "input-group";

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
            className={
                classNames(
                    className,
                    PREFIX,
                    size && `${PREFIX}-${size}`
                )
            } {...otherProps}>
            {_children}
        </div>
    );
}

InputGroup.propTypes = {
    size: PropTypes.oneOf(["sm", "lg"])
};