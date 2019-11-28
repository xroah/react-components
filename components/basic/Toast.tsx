import * as React from "react";
import PropTypes from "prop-types";
import Fade from "../Fade";
import { classNames, handleFuncProp } from "../utils";

export interface ToastProps extends React.HTMLAttributes<HTMLElement> {
    title?: string;
    titleImgSize?: number;
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

export default class Toast extends React.Component<ToastProps> {

    timer: NodeJS.Timeout | null = null;

    componentDidMount() {
        if (this.props.visible) this.componentDidUpdate();
    }

    componentDidUpdate() {
        const {
            autoHide,
            delay = 3000,
            visible
        } = this.props;

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        if (visible) {
            if (autoHide && !this.timer) {
                this.timer = setTimeout(
                    () => {
                        this.handleClose();
                        this.timer = null;
                    },
                    delay);
            }
        }
    }

    handleClose = () => {
        handleFuncProp(this.props.onClose)();
    };

    renderHeader() {
        const {
            header,
            title,
            titleImg,
            titleMsg,
            closable,
            titleImgSize = 20
        } = this.props;

        if (header === null) {
            return null;
        } else if (React.isValidElement(header)) {
            return header;
        }

        let img = titleImg;

        if (typeof img === "string") {
            img = (
                <img
                    className="rounded mr-2"
                    src={img}
                    width={titleImgSize}
                    height={titleImgSize} />
            );
        }

        return (
            <div className="toast-header">
                {img}
                {
                    !!title && (<strong className="mr-auto">{title}</strong>)
                }
                {
                    titleMsg && (<small className="text-muted">{titleMsg}</small>)
                }
                {
                    closable && (
                        <button
                            type="button"
                            className="ml-2 mb-1 close"
                            onClick={this.handleClose}>
                            <span>&times;</span>
                        </button>
                    )
                }
            </div>
        );
    }

    render() {
        const {
            className,
            children,
            visible,
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
                in={!!visible}
                hidingClass="hide"
                timeout={300}
                {...otherProps}>
                <div className={
                    classNames(
                        className,
                        "toast"
                    )
                }>
                    {this.renderHeader()}
                    <div className="toast-body">
                        {children}
                    </div>
                </div>
            </Fade>
        );
    }

}