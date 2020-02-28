import * as React from "react";
import PropTypes from "prop-types";
import Fade from "../Fade";
import { classNames, handleFuncProp } from "../utils";
import NoTransition from "../NoTransition";
import { CommonPropsWithoutTitle } from "../CommonPropsInterface";

export interface ToastProps extends CommonPropsWithoutTitle<HTMLDivElement> {
    title?: string | React.ReactNode;
    iconSize?: number;
    icon?: React.ReactNode;
    extra?: string | React.ReactNode;
    autoHide?: boolean;
    closable?: boolean;
    header?: string | React.ReactNode;
    delay?: number;
    fade?: boolean;
    visible?: boolean;
    onClose?: Function;
}

const stringOrNode = PropTypes.oneOfType([PropTypes.string, PropTypes.node]);

export default class Toast extends React.Component<ToastProps> {

    private timer: NodeJS.Timeout | null = null;

    static propTypes = {
        title: stringOrNode,
        icon: stringOrNode,
        iconSize: PropTypes.number,
        extra: stringOrNode,
        autoHide: PropTypes.bool,
        closable: PropTypes.bool,
        header: stringOrNode,
        delay: PropTypes.number,
        fade: PropTypes.bool,
        visible: PropTypes.bool,
        onClose: PropTypes.func
    };
    static defaultProps = {
        delay: 3000,
        fade: true,
        visible: false,
        iconSize: 20,
        closable: true,
        autoHide: true
    };

    componentDidMount() {
        if (this.props.visible) this.componentDidUpdate();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    componentDidUpdate() {
        const {
            autoHide,
            delay,
            visible
        } = this.props;

        this.clearTimer();

        if (visible && autoHide) {
            this.timer = setTimeout(this.handleClose, delay as number);
        }
    }

    handleClose = () => {
        this.clearTimer();
        handleFuncProp(this.props.onClose)();
    };

    renderHeader() {
        let {
            header,
            title,
            icon,
            extra,
            closable,
            iconSize
        } = this.props;
        let img = icon;

        if (header === null) {
            return null;
        }

        if (header === undefined) {
            if (typeof img === "string") {
                img = (
                    <img
                        className="rounded"
                        src={img}
                        width={iconSize}
                        height={iconSize} />
                );
            }

            header = (
                <>
                    {img}
                    {
                        !!title && (
                            <strong className="ml-2">{title}</strong>
                        )
                    }
                    {
                        !!extra && (
                            <small className="text-muted ml-auto">{extra}</small>
                        )
                    }
                    {
                        closable && (
                            <button
                                type="button"
                                className="ml-2 mb-1 close"
                                aria-label="Close"
                                onClick={this.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        )
                    }
                </>
            );
        }

        return (
            <div className="toast-header">
                {header}
            </div>
        );
    }

    render() {
        const {
            className,
            children,
            visible,
            fade,
            ...otherProps
        } = this.props;

        delete otherProps.icon;
        delete otherProps.iconSize;
        delete otherProps.extra;
        delete otherProps.autoHide;
        delete otherProps.closable;
        delete otherProps.header;
        delete otherProps.delay;
        delete otherProps.onClose;
        delete otherProps.title;

        const toast = (
            <div className={
                classNames(
                    className,
                    "toast"
                )
            } {...otherProps as any}>
                {this.renderHeader()}
                <div className="toast-body">
                    {children}
                </div>
            </div>
        );
        const transitionProps = {
            in: !!visible,
            unmountOnExit: true
        };

        return (
            fade ?
                <Fade {...transitionProps}>{toast}</Fade> :
                <NoTransition showClass="show" {...transitionProps}>{toast}</NoTransition>
        );
    }

}