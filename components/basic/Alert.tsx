import * as React from "react";
import PropTypes from "prop-types";
import Fade from "../Fade";
import NoTransition from "../NoTransition";
import Button from "./Button";
import {
    classNames,
    variantType,
    variantArray,
    handleFuncProp,
    createComponentByClass
} from "../utils";
import { CommonProps } from "../CommonPropsInterface";

export interface AlertProps extends CommonProps<HTMLDivElement> {
    variant?: variantType;
    fade?: boolean;
    dismissible?: boolean;
    visible?: boolean;
    heading?: string | React.ReactNode;
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
        heading,
        onClose,
        onClosed,
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
        handleFuncProp(onClose)();
    };
    const handleExited = () => {
        handleFuncProp(onClosed)();
    };
    const handleExit = () => {
        if (!dismissible) {
            handleClick();
        }
    };

    if (dismissible) {
        button = (
            <Button
                variant="link"
                type="button"
                className="close"
                aria-label="Close"
                onClick={handleClick}>
                <span aria-hidden="true">&times;</span>
            </Button>
        );
    }

    const child = (
        <div className={classes} {...otherProps}>
            {
                heading !== undefined && (
                    <h4 className="alert-heading">{heading}</h4>
                )
            }
            {children}
            {button}
        </div>
    );
    const transitionProps = {
        in: !!visible,
        unmountOnExit: true,
        onExit: handleExit,
        onExited: handleExited
    };

    return (
        fade ?
            <Fade {...transitionProps}>{child}</Fade> :
            <NoTransition {...transitionProps}>{child}</NoTransition>
    );
}

Alert.propTypes = {
    variant: PropTypes.oneOf(variantArray),
    fade: PropTypes.bool,
    heading: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
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