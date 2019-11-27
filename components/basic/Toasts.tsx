import * as React from "react";
import PropTypes from "prop-types";
import Fade from "../Fade";
import { classNames } from "../utils";

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
    defaultVisible?: boolean;
    onClose?: Function;
}

interface ToastState {
    visible?: boolean;
}

export default class Toast extends React.Component<ToastProps, ToastState> {

    timer: NodeJS.Timeout | null = null;

    constructor(props: ToastProps) {
        super(props);

        let visible = props.defaultVisible;

        if (props.visible !== undefined) {
            visible = props.visible;
        }

        this.state = {
            visible
        };
    }

    static getDerivedStateFromProps(nextProps: ToastProps, nextState: ToastState) {
        if ("visible" in nextProps) {
            return {
                visible: nextProps.visible
            };
        }

        return nextState;
    }

    componentDidMount() {
        if (this.state.visible) this.componentDidUpdate();
    }

    componentDidUpdate() {
        const {
            autoHide,
            delay = 3000
        } = this.props;

        if (this.state.visible) {
            if (autoHide && !this.timer) {
                this.timer = setTimeout(
                    () => {
                        this.setState({
                            visible: false
                        });
                        this.timer = null;
                    },
                    delay);
            }
        } else {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        }
    }

    handleClose = () => {
        this.setState({
            visible: false
        });
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

        if (img && !React.isValidElement(img)) {
            img = (
                <img
                    className="rounded mr-2"
                    src={img as string}
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
            ...otherProps
        } = this.props;

        delete otherProps.visible;
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
                in={!!this.state.visible}
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