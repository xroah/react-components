import * as React from "react";
import { Transition } from "react-transition-group";
import PropTypes from "prop-types";
import {
    classNames,
    variantType,
    variantArray
} from "../utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: variantType;
    fade?: boolean;
    dismissible?: boolean;
    visible?: boolean;
    onClose?: Function;
    onClosed?: Function;
}

export default class Alert extends React.Component<AlertProps> {

    static propTypes = {
        variant: PropTypes.oneOf(variantArray),
        fade: PropTypes.bool,
        dismissible: PropTypes.bool,
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onClosed: PropTypes.func
    };

    static defaultProps = {
        dismissible: false,
        fade: true,
        visible: true
    };

    handleClick = () => {
        let {
            onClose = () => {
            }
        } = this.props;
        onClose();
    };

    handleExited = () => {
        let {
            onClosed = () => {
            }
        } = this.props;
        onClosed();
    };

    render() {
        const {
            className,
            variant,
            fade,
            dismissible,
            visible,
            children,
            ...otherProps
        } = this.props;
        let button: React.ReactNode = null;
        let duration = fade ? 300 : 0;

        if (dismissible) {
            button = (
                <button type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.handleClick}>
                    <span aria-hidden="true">&times;</span>
                </button>
            );
        }

        return (
            <Transition
                in={visible}
                timeout={duration}
                onExited={this.handleExited}
                unmountOnExit={true}>
                {
                    state => {
                        const classes = classNames(
                            className,
                            "alert",
                            variant && `alert-${variant}`,
                            fade && "fade",
                            dismissible && "alert-dismissible",
                            state === "entered" ? "show" : ""
                        );
                        return (
                            <div className={classes} {...otherProps} role={"alert"}>
                                {children}
                                {button}
                            </div>
                        );
                    }
                }
            </Transition>
        );
    }

}