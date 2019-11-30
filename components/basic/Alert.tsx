import * as React from "react";
import PropTypes from "prop-types";
import Fade from "../Fade";
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
        const classes = classNames(
            className,
            "alert",
            variant && `alert-${variant}`,
            dismissible && "alert-dismissible"
        );

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
            <Fade
                in={!!visible}
                timeout={duration}
                onExited={this.handleExited}
                unmountOnExit={true}>

                <div className={classes} {...otherProps} role={"alert"}>
                    {children}
                    {button}
                </div>
            </Fade>
        );
    }

}