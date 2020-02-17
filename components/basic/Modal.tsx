import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    handleFuncProp,
    emulateTransitionEnd
} from "../utils";
import Button from "./Button";
import Fade from "../Fade";
import { createPortal } from "react-dom";

export interface ModalProps extends React.HTMLAttributes<HTMLElement> {
    visible?: boolean;
    titleText?: string | React.ReactNode;
    okText?: string | React.ReactNode;
    cancelText?: string | React.ReactNode;
    closable?: boolean;
    showCancel?: boolean;
    showOk?: boolean;
    header?: string | React.ReactNode;
    footer?: string | React.ReactNode;
    fade?: boolean;
    centered?: boolean;
    size?: "xl" | "lg" | "sm";
    backdrop?: boolean | "static";
    scrollable?: boolean;
    autoFocus?: boolean;
    keyboard?: boolean;
    onOk?: (event: React.MouseEvent) => void;
    onCancel?: (event: React.MouseEvent) => void;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
}

const stringOrNode = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);

interface ModalState {
    className?: string;
}

export default class Modal extends React.Component<ModalProps, ModalState> {

    static defaultProps = {
        visible: false,
        showCancel: true,
        showOk: true,
        closable: true,
        backdrop: true,
        fade: true,
        autoFocus: true,
        keyboard: true,
        okText: "确定",
        cancelText: "取消"
    };
    static propTypes = {
        visible: PropTypes.bool,
        titleText: stringOrNode,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        okText: stringOrNode,
        cancelText: stringOrNode,
        closable: PropTypes.bool,
        showCancel: PropTypes.bool,
        header: stringOrNode,
        footer: stringOrNode,
        fade: PropTypes.bool,
        autoFocus: PropTypes.bool,
        keyboard: PropTypes.bool,
        centered: PropTypes.bool,
        scrollable: PropTypes.bool,
        size: PropTypes.oneOf(["xl", "lg", "sm"]),
        backdrop: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf(["static"])
        ]),
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func
    };

    backdropContainer: HTMLElement | null = null;
    dialogRef = React.createRef<HTMLDivElement>();
    scrollWidth: number = 0;
    activeElement: Element | null = null;
    modalRef = React.createRef<HTMLDivElement>();
    state: ModalState = {};

    componentDidMount() {
        this.scrollWidth = this.getScrollWidth();
    }

    componentWillUnmount() {
        let backdrop = this.backdropContainer;

        if (backdrop) {
            document.body.removeChild(backdrop);
            this.backdropContainer = null;
        }

        this.removeKeyEvent();
    }

    getScrollWidth() {
        const div = document.createElement("div");
        const SIZE = 200;
        div.style.cssText = `
            position: absolute;
            left: -10000px;
            overflow: scroll;
            visibility: hidden;
            width: ${SIZE}px;
            height: ${SIZE}px;
         `;
        const child = document.createElement("div");

        div.appendChild(child);
        document.body.appendChild(div);

        const width = 200 - child.offsetWidth;

        document.body.removeChild(div);

        return width;
    }

    handleKeyDown = (evt: KeyboardEvent) => {
        const { visible, keyboard } = this.props;
        const key = evt.key.toLowerCase();
        const keySet = new Set(["esc", "escape"]);

        if (visible && keyboard && keySet.has(key)) {
            this.handleCancel(evt);
        }
    }

    addKeyEvent = () => {
        this.props.keyboard &&
            document.addEventListener("keydown", this.handleKeyDown);
    }

    removeKeyEvent = () => {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleClickBackdrop = (evt: React.MouseEvent<HTMLDivElement>) => {
        const {
            props: {
                backdrop
            },
            dialogRef: { current },
            modalRef: { current: modalEl },
            handleCancel
        } = this;
        const target = evt.target;

        if (
            !backdrop ||
            !modalEl ||
            !current ||
            //click the dialog
            current === target ||
            //click inside of the dialog
            current.contains(target as Node)
        ) return;

        if (backdrop !== "static") {
            handleCancel(evt);
        } else {
            this.setState({
                className: "modal-static"
            });
            emulateTransitionEnd(modalEl, () => {
                this.setState({
                    className: ""
                });
            });
            this.focus();
        }
    }

    handleOk = (evt: React.MouseEvent) => {
        handleFuncProp(this.props.onOk)(evt);
    }

    handleCancel = (evt: React.MouseEvent | KeyboardEvent) => {
        handleFuncProp(this.props.onCancel)(evt);
    }

    handleEnter = () => {
        const body = document.body;
        this.activeElement = document.activeElement;

        body.classList.add("modal-open");
        body.style.paddingRight = `${this.scrollWidth}px`;
        handleFuncProp(this.props.onShow)();
    }

    focus() {
        const {
            props: { autoFocus },
            modalRef: { current }
        } = this;

        if (autoFocus && current) {
            current.focus();
        }
    }

    handleEntered = () => {
        this.addKeyEvent();
        handleFuncProp(this.props.onShown)();
    }

    handleExit = () => {
        handleFuncProp(this.props.onHide)();
    }

    handleExited = () => {
        const body = document.body;
        const ae = this.activeElement as any;

        if (ae && ae.focus) {
            ae.focus();
        }

        body.style.paddingRight = "";
        this.activeElement = null;

        body.classList.remove("modal-open");
        this.removeKeyEvent();
        handleFuncProp(this.props.onHidden)();
    }

    render() {
        const {
            props: {
                visible,
                okText,
                cancelText,
                header,
                footer,
                closable,
                showCancel,
                showOk,
                fade,
                centered,
                size,
                titleText: title,
                children,
                className,
                backdrop,
                scrollable,
                ...otherProps
            },
            state: {
                className: stateClass
            }
        } = this;

        delete otherProps.onOk;
        delete otherProps.onCancel;
        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHidden;
        delete otherProps.onHide;
        delete otherProps.autoFocus;
        delete otherProps.keyboard;

        const classes = classNames(
            className,
            stateClass,
            "modal"
        );
        const PREFIX = "modal-dialog";
        const dialogClasses = classNames(
            PREFIX,
            size && `modal-${size}`,
            centered && `${PREFIX}-centered`,
            scrollable && `${PREFIX}-scrollable`
        );
        let _header = header === null ? null : (
            <div className="modal-header">
                {
                    header === undefined ? (
                        <>
                            <h5 className="modal-title">{title}</h5>
                            {
                                closable && (
                                    <button
                                        type="button"
                                        className="close"
                                        onClick={this.handleCancel}
                                        aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                )
                            }
                        </>
                    ) : header
                }
            </div>
        );
        let _footer = footer === null ? null : (
            <div className="modal-footer">
                {
                    footer === undefined ? (
                        <>
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
                        </>
                    ) : footer
                }
            </div>
        );


        if (!this.backdropContainer) {
            this.backdropContainer = document.createElement("div");
            document.body.appendChild(this.backdropContainer);
        }

        return createPortal(
            <>
                <Fade
                    in={!!visible}
                    animation={fade}
                    appear
                    toggleDisplay
                    onEnter={this.handleEnter}
                    onEntered={this.handleEntered}
                    onExit={this.handleExit}
                    onExited={this.handleExited}>
                    <div
                        className={classes}
                        onClick={this.handleClickBackdrop}
                        ref={this.modalRef}
                        tabIndex={-1}
                        {...otherProps}>
                        <div className={dialogClasses} ref={this.dialogRef}>
                            <div className="modal-content">
                                {_header}
                                <div className="modal-body">
                                    {children}
                                </div>
                                {_footer}
                            </div>
                        </div>
                    </div>
                </Fade>
                {
                    !!backdrop && (
                        <Fade animation={fade} in={!!visible} unmountOnExit>
                            <div className="modal-backdrop" />
                        </Fade>
                    )
                }
            </>,
            this.backdropContainer
        );
    }

}