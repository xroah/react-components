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
import { ModalContext } from "../contexts";

export interface ModalProps extends React.HTMLAttributes<HTMLElement> {
    visible?: boolean;
    forceRender?: boolean;
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
    mountTo?: HTMLElement;
    onOk?: (event: React.MouseEvent) => void;
    onCancel?: (event: React.MouseEvent) => void;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
}

const stringOrNode = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);
let zIndex = 2000;

interface ModalState {
    className?: string;
}

export default class Modal extends React.Component<ModalProps, ModalState> {

    static defaultProps = {
        visible: false,
        forceRender: false,
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

    container: HTMLElement | null = null;
    dialogRef = React.createRef<HTMLDivElement>();
    scrollWidth: number = 0;
    activeElement: Element | null = null;
    modalRef = React.createRef<HTMLDivElement>();
    state: ModalState = {};
    previousBodyPadding: string = "";
    previousBodyClassName: string = "";

    componentDidMount() {
        this.scrollWidth = this.getScrollWidth();
    }

    componentWillUnmount() {
        let backdrop = this.container;

        if (backdrop) {
            document.body.removeChild(backdrop);
            this.container = null;
        }
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

    handleKeyDown = (evt: React.KeyboardEvent) => {
        const { visible, keyboard } = this.props;
        const key = evt.key.toLowerCase();
        const keySet = new Set(["esc", "escape"]);

        if (visible && keyboard && keySet.has(key)) {
            this.handleCancel(evt);
        }
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

    handleCancel = (evt: React.MouseEvent | React.KeyboardEvent) => {
        handleFuncProp(this.props.onCancel)(evt);
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

    handleEnter = () => {
        const body = document.body;
        const hasScrollbar = body.clientWidth < window.innerWidth;
        const pr = parseFloat(getComputedStyle(body).getPropertyValue("padding-right"));
        this.activeElement = document.activeElement;
        this.previousBodyClassName = body.className;
        this.previousBodyPadding = body.style.paddingRight;

        body.classList.add("modal-open");

        //may has style="overflow: scroll" or something else
        const afterHasScrollbar = body.clientWidth < window.innerWidth;

        if (hasScrollbar && !afterHasScrollbar) {
            body.style.paddingRight = `${pr + this.scrollWidth}px`;
        }

        handleFuncProp(this.props.onShow)();
    }

    handleEntered = () => {
        this.focus();
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

        body.style.paddingRight = this.previousBodyPadding;
        body.className = this.previousBodyClassName;
        this.activeElement = null;
        this.previousBodyClassName = this.previousBodyPadding = "";

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
                forceRender,
                scrollable,
                mountTo,
                ...otherProps
            },
            state: {
                className: stateClass
            }
        } = this;

        if (!forceRender && !visible && !this.container) return null;

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


        if (!this.container) {
            let div = this.container = document.createElement("div");
            div.style.zIndex = `${zIndex++}`;

            (mountTo || document.body).appendChild(this.container);
        }

        return createPortal(
            <ModalContext.Provider value={{isModal: true, visible: !!visible}}>
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
                        onKeyDown={this.handleKeyDown}
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
            </ModalContext.Provider>,
            this.container
        );
    }

}