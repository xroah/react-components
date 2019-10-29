import * as React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

interface ButtonProps  extends  React.HTMLAttributes<Element>{
    variant?: string;
    outline?: boolean;
    size?: string;
    active?: boolean;
    block?: boolean;
    disabled?: boolean;
}

const propTypes = {
    variant: PropTypes.string,
    outline: PropTypes.bool,
    size: PropTypes.string,
    active: PropTypes.bool,
    block: PropTypes.bool,
    disabled: PropTypes.bool
};

const defaultProps = {
    variant: "primary"
};

const Button = React.forwardRef(
    ({
         variant,
         size,
         className,
         active,
         block,
         outline,
         children,
         ...otherProps
     }: ButtonProps, ref: React.Ref<any>) => {
        const classNames = classnames(
            "btn",
            className,
            active && "active",
            outline ? `btn-outline-${variant}` : `btn-${variant}`,
            size && `btn-${size}`,
            block && `btn-block`
        );
        return (
            <button
                className={classNames}
                ref={ref}
                {...otherProps}>
                {children}
            </button>
        );
    }
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.displayName = "Button";

export default Button;