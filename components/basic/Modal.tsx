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
    scrollable?: boolean;
    onOk?: (event: React.MouseEvent) => void;
    onCancel?: (event: React.MouseEvent) => void;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
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
        scrollable: PropTypes.bool,
        size: PropTypes.oneOf(["xl", "lg", "sm"]),
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func
    };

    backdropContainer: HTMLElement | null = null;
    dialogRef = React.createRef<HTMLDivElement>();

    componentWillUnmount() {
        let backdrop = this.backdropContainer;
        if (backdrop) {
            document.body.removeChild(backdrop);
            this.backdropContainer = null;
        }
    }

    handleClickBackdrop = (evt: React.MouseEvent<HTMLDivElement>) => {
        const {
            props: {
                backdrop
            },
            dialogRef: { current },
            handleCancel
        } = this;

        if (backdrop !== "static") {
            const target = evt.target;

            //click outside of the dialog, close the modal
            if (current && current !== target && !current.contains(target as Node)) {
                handleCancel(evt);
            }
        }
    }

    handleOk = (evt: React.MouseEvent) => {
        handleFuncProp(this.props.onOk)(evt);
    }

    handleCancel = (evt: React.MouseEvent) => {
        handleFuncProp(this.props.onCancel)(evt);
    }

    handleEnter = () => {
        handleFuncProp(this.props.onShow)();
    }

    handleEntered = () => {
        handleFuncProp(this.props.onShown)();
        document.body.classList.add("modal-open");
        console.log("entered")
    }

    handleExit = () => {
        handleFuncProp(this.props.onHide)();
    }

    handleExited = () => {
        document.body.classList.remove("modal-open");
        handleFuncProp(this.props.onHidden)();
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
            backdrop,
            scrollable,
            ...otherProps
        } = this.props;

        delete otherProps.onOk;
        delete otherProps.onCancel;
        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHidden;
        delete otherProps.onHide;

        const classes = classNames(className, "modal");
        const PREFIX = "modal-dialog"; 
        const dialogClasses = classNames(
            PREFIX,
            size && `modal-${size}`,
            centered && `${PREFIX}-centered`,
            scrollable && `${PREFIX}-scrollable`
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
                    appear
                    toggleDisplay
                    onEnter={this.handleEnter}
                    onEntered={this.handleEntered}
                    onExit={this.handleExit}
                    onExited={this.handleExited}>
                    <div
                        className={classes}
                        onClick={this.handleClickBackdrop}
                        {...otherProps}>
                        <div className={dialogClasses} ref={this.dialogRef}>
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
                {
                    backdrop && (
                        <Fade timeout={timeout} in={!!visible} unmountOnExit>
                            <div className="modal-backdrop" />
                        </Fade>
                    )
                }
            </>,
            this.backdropContainer
        );
    }

}