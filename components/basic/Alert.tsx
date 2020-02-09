import * as React from "react";
import PropTypes from "prop-types";
import Fade from "../Fade";
import Button from "./Button";
import {
    classNames,
    variantType,
    variantArray,
    handleFuncProp,
    createComponentByClass
} from "../utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: variantType;
    fade?: boolean;
    dismissible?: boolean;
    visible?: boolean;
    onClose?: Function;
    onClosed?: Function;
}

export default function Alert(props: AlertProps) {
    const {
        className,
        variant,
        fade,
        dismissible,
        visible,
        children,
        ...otherProps
    } = props;
    let button: React.ReactNode = null;
    const classes = classNames(
        className,
        "alert",
        variant && `alert-${variant}`,
        dismissible && "alert-dismissible"
    );
    const handleClick = () => {
        handleFuncProp(props.onClose)();
    };
    const handleExited = () => {
        handleFuncProp(props.onClosed)();
    };
    
    if (dismissible) {
        button = (
            <Button
            variant="link"
            type="button"
            className="close"
            onClick={handleClick}>
                <span>&times;</span>
            </Button>
        );
    }
    
    const child = (
        <div className={classes} {...otherProps}>
            {children}
            {button}
        </div>
    );
    
    return fade ? (
        <Fade
            in={!!visible}
            timeout={150}
            onExited={handleExited}
            unmountOnExit>
            {child}
        </Fade>
    ) : visible ? child : null;
}

Alert.propTypes = {
    variant: PropTypes.oneOf(variantArray),
    fade: PropTypes.bool,
    dismissible: PropTypes.bool,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    onClosed: PropTypes.func
};
Alert.defaultProps = {
    dismissible: false,
    fade: true,
    visible: true
};

Alert.Link = createComponentByClass({
    tag: "a",
    displayName: "AlertLink",
    className: "alert-link"
});