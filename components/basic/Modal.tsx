import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    handleFuncProp
} from "../utils";
import Button from "./Button";
import Fade from "../Fade";
import { createPortal } from "react-dom";

export interface ModalProps extends React.HTMLAttributes<HTMLElement> {
    visible?: boolean;
    title?: string;
    okText?: string;
    cancelText?: string;
    closable?: boolean;
    showCancel?: boolean;
    showOk?: boolean;
    footer?: React.ReactNode;
    fade?: boolean;
    centered?: boolean;
    size?: "xl" | "lg" | "sm";
    backdrop?: boolean | "static";
    onOk?: (event: React.MouseEvent) => void;
    onCancel?: (event: React.MouseEvent) => void;
}

export default class Modal extends React.Component<ModalProps> {

    static defaultProps = {
        showCancel: true,
        showOk: true,
        closable: true,
        backdrop: true,
        fade: true
    };
    static propTypes = {
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        okText: PropTypes.string,
        cancelText: PropTypes.string,
        closable: PropTypes.bool,
        showCancel: PropTypes.bool,
        footer: PropTypes.node,
        fade: PropTypes.bool,
        centered: PropTypes.bool,
        size: PropTypes.oneOf(["xl", "lg", "sm"])
    };

    backdropContainer: HTMLElement | null = null;

    componentWillUnmount() {
        let backdrop = this.backdropContainer;
        if (backdrop) {
            document.body.removeChild(backdrop);
            this.backdropContainer = null;
        }
    }

    handleClickBackdrop = (evt: React.MouseEvent) => {
        if (this.props.backdrop !== "static") {
            this.handleCancel(evt);
        }
    }

    handleOk = (evt: React.MouseEvent) => {
        handleFuncProp(this.props.onOk)(evt);
    }

    handleCancel = (evt: React.MouseEvent) => {
        handleFuncProp(this.props.onCancel)(evt);
    }

    handleEnter = (node: HTMLElement) => {
        node.style.display = "block";
        document.body.classList.add("modal-open");
    }

    handleExited = (node: HTMLElement) => {
        node.style.display = "none";
        document.body.classList.remove("modal-open");
        console.log("exited")
    }

    render() {
        const {
            visible,
            okText = "确定",
            cancelText = "取消",
            footer,
            closable,
            showCancel,
            showOk,
            fade,
            centered,
            size,
            title,
            children,
            className,
            ...otherProps
        } = this.props;

        delete otherProps.onOk;
        delete otherProps.onCancel;
        delete otherProps.backdrop;

        const classes = classNames(className, "modal");
        const dialogClasses = classNames(
            "modal-dialog",
            size && `modal-${size}`,
            centered && `modal-dialog-centered`
        );;
        let _footer = footer;
        let timeout = fade ? 300 : 0;

        if (_footer === undefined) {
            _footer = (
                <div className="modal-footer">
                    {
                        showCancel && (
                            <Button variant="secondary" onClick={this.handleCancel}>
                                {cancelText}
                            </Button>
                        )
                    }
                    {
                        showOk && (
                            <Button onClick={this.handleOk}>
                                {okText}
                            </Button>
                        )
                    }
                </div>
            );
        }

        if (!this.backdropContainer) {
            this.backdropContainer = document.createElement("div");
            document.body.appendChild(this.backdropContainer);
        }

        return createPortal(
            <>
                <Fade
                    in={!!visible}
                    timeout={timeout}
                    onEnter={this.handleEnter}
                    onExited={this.handleExited}>
                    <div className={classes} {...otherProps}>
                        <div className={dialogClasses}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{title}</h5>
                                    {
                                        closable && (
                                            <button
                                                type="button"
                                                className="close"
                                                onClick={this.handleCancel}>
                                                <span>&times;</span>
                                            </button>
                                        )
                                    }
                                </div>
                                <div className="modal-body">
                                    {children}
                                </div>
                                {_footer}
                            </div>
                        </div>
                    </div>
                </Fade>
                <Fade timeout={timeout} in={!!visible} unmountOnExit>
                    <div className="modal-backdrop" />
                </Fade>
            </>,
            this.backdropContainer
        );
    }

}