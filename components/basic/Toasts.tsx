import * as React from "react";
import PropTypes from "prop-types";
import Fade from "../Fade";
import { classNames } from "../utils";

export interface ToastProps extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    titleImg?: React.ReactNode;
    titleMsg?: React.ReactNode;
    autoHide?: boolean;
    closable?: boolean;
    header?: React.ReactNode | null;
    delay?: number;
    fade?: boolean;
    visible?: boolean;
    onClose?: Function;
}

interface ToastState {
    visible?: boolean;
}

export default class Toast extends React.Component<ToastProps, ToastState> {

    renderHeader() {
        const { } = this.props;
    }

    render() {
        const {
            visible,
            className,
            ...otherProps
        } = this.props;

        delete otherProps.title;
        delete otherProps.titleImg;
        delete otherProps.titleMsg;
        delete otherProps.autoHide;
        delete otherProps.closable;
        delete otherProps.header;
        delete otherProps.delay;
        delete otherProps.onClose;
        delete otherProps.fade;

        return (
            <Fade
                in={visible as boolean}
                hidingClass="hide"
                timeout={300}
                {...otherProps}>
                <div className={
                    classNames(
                        className,
                        "toast"
                    )
                }>
                    111111
                </div>
            </Fade>
        );
    }

}