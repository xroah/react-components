import * as React from "react";
import PropTypes from "prop-types";
import {
    classNames,
    handleFuncProp,
    emulateTransitionEnd,
    variantType,
    variantArray
} from "../utils";
import Button from "./Button";
import Fade from "../Fade";
import { createPortal } from "react-dom";
import { ModalContext } from "../contexts";

export interface ModalCommonOptions extends React.HTMLAttributes<HTMLElement> {
    visible?: boolean;
    forceRender?: boolean;
    okText?: string | React.ReactNode;
    cancelText?: string | React.ReactNode;
    okType?: variantType;
    cancelType?: variantType;
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

export interface ModalProps extends ModalCommonOptions {
    closable?: boolean;
    showCancel?: boolean;
    showOk?: boolean;
    header?: string | React.ReactNode;
    footer?: string | React.ReactNode;
    fade?: boolean;
    mountTo?: HTMLElement;
    container?: HTMLElement; //mountTo and container are internal provisionally
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
        cancelText: "取消",
        okType: "primary",
        cancelType: "light"
    };
    static propTypes = {
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        okText: stringOrNode,
        cancelText: stringOrNode,
        okType: PropTypes.oneOf(variantArray),
        cancelType: PropTypes.oneOf(variantArray),
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
    activeElement: Element | null = null;
    modalRef = React.createRef<HTMLDivElement>();
    state: ModalState = {};
    previousBodyPadding: string = "";
    previousBodyClassName: string = "";

    constructor(props: ModalProps) {
        super(props);

        this.container = props.container || null;
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
        const hasScrollbar = document.documentElement.clientWidth < window.innerWidth;
        const scrollWidth = this.getScrollWidth();
        const pr = parseFloat(getComputedStyle(body).getPropertyValue("padding-right"));
        this.activeElement = document.activeElement;
        this.previousBodyClassName = body.className;
        this.previousBodyPadding = body.style.paddingRight;

        body.classList.add("modal-open");

        //may has style="overflow: scroll" or something else
        const afterHasScrollbar = body.clientWidth < window.innerWidth;

        if (hasScrollbar && !afterHasScrollbar) {
            body.style.paddingRight = `${pr + scrollWidth}px`;
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

    getHeader() {
        const {
            header,
            title,
            closable,
        } = this.props;

        if (header === null) return null;

        const defaultHeader = (
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
        );

        return (
            <div className="modal-header">
                {header === undefined ? defaultHeader : header}
            </div>
        );
    }

    getFooter() {
        const {
            footer,
            showCancel,
            cancelText,
            showOk,
            okText,
            okType,
            cancelType
        } = this.props;

        if (footer === null) return null;

        const defaultFooter = (
            <>
                {
                    showCancel && (
                        <Button variant={cancelType} onClick={this.handleCancel}>
                            {cancelText}
                        </Button>
                    )
                }
                {
                    showOk && (
                        <Button variant={okType} onClick={this.handleOk}>
                            {okText}
                        </Button>
                    )
                }
            </>
        );

        return (
            <div className="modal-footer">
                {footer === undefined ? defaultFooter : footer}
            </div>
        );
    }

    render() {
        const {
            props: {
                visible,
                fade,
                centered,
                size,
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

        if (
            !forceRender &&
            !visible &&
            !this.container
        ) return null;

        delete otherProps.onOk;
        delete otherProps.onCancel;
        delete otherProps.onShow;
        delete otherProps.onShown;
        delete otherProps.onHidden;
        delete otherProps.onHide;
        delete otherProps.autoFocus;
        delete otherProps.keyboard;
        delete otherProps.header;
        delete otherProps.title;
        delete otherProps.closable;
        delete otherProps.footer;
        delete otherProps.showCancel;
        delete otherProps.showOk;
        delete otherProps.okText;
        delete otherProps.okType;
        delete otherProps.cancelType;
        delete otherProps.cancelText;

        const classes = classNames(
            stateClass,
            "modal"
        );
        const PREFIX = "modal-dialog";
        const dialogClasses = classNames(
            PREFIX,
            className,
            size && `modal-${size}`,
            centered && `${PREFIX}-centered`,
            scrollable && `${PREFIX}-scrollable`
        );
        const parent = mountTo || document.body;
        const _header = this.getHeader();
        const _footer = this.getFooter();

        if (!this.container) {
            const div = this.container = document.createElement("div");
            div.style.zIndex = `${zIndex++}`;

            parent.appendChild(this.container);
        } else if (!this.container.parentNode) {
            parent.appendChild(this.container);
        }

        return createPortal(
            <ModalContext.Provider value={{ isModal: true, visible: !!visible }}>
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
                        tabIndex={-1}>
                        <div
                            className={dialogClasses}
                            ref={this.dialogRef}
                            {...otherProps}>
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