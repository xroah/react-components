import * as React from "react";
import PropTypes from "prop-types";
import Portal from "../../Portal";
import CSSTransition from "../../CSSTransition";
import { CommonProps } from "../../CommonPropsInterface";
import { classNames, handleFuncProp, getScrollBarWidth } from "../../utils";
import Fade from "../../Fade";
import "./style/index.scss"

type placement = "left" | "top" | "right" | "bottom";

interface DrawerProps extends CommonProps<HTMLDivElement> {
    visible?: boolean;
    width?: number | string;
    height?: number | string;
    placement?: placement;
    backdrop?: boolean | "static";
    forceRender?: boolean;
    mountNode?: HTMLElement | string | false;
    unmountOnClose?: boolean;
    onShow?: Function;
    onShown?: Function;
    onHide?: Function;
    onHidden?: Function;
    onClose?: Function;
}

interface DrawerState {
    className?: string;
    exited?: boolean;
}

export default class Drawer extends React.Component<DrawerProps, DrawerState> {

    static defaultProps = {
        width: 256,
        height: 256,
        placement: "left",
        visible: false,
        mountNode: "body",
        backdrop: true,
        unmountOnClose: false,
        forceRender: false
    };
    static propTypes = {
        visible: PropTypes.bool,
        forceRender: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        backdrop: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.oneOf(["static"])
        ]),
        placement: PropTypes.oneOf([
            "left",
            "top",
            "right",
            "bottom"
        ]),
        unmountOnClose: PropTypes.bool,
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func,
        onClose: PropTypes.func
    };
    private bodyPaddingRight: any = "";
    private bodyOverflow: any = "";

    constructor(props: DrawerProps) {
        super(props);
        
        this.state = {
            className: props.visible ? "show" : "hide"
        };
    }

    handleClickBackdrop = (evt: React.MouseEvent) => {
        const {
            onClose,
            backdrop
        } = this.props;

        if (backdrop && backdrop !== "static") {
            handleFuncProp(onClose)();
        }
    }

    handleEnter = () => {
        const hasScrollbar = document.documentElement.clientWidth < window.innerWidth;
        const body = document.body;
        this.bodyOverflow = body.style.overflow;
        this.bodyPaddingRight = body.style.paddingRight;
        body.style.overflow = "hidden";
        
        if (hasScrollbar) {
            const pr = parseFloat(getComputedStyle(body).getPropertyValue("padding-right"));
            body.style.paddingRight = `${pr + getScrollBarWidth()}px`;
        }
        
        this.setState({
            exited: false
        });
        handleFuncProp(this.props.onShow)();
    }

    handleEntering = () => {
        this.setState({
            className: "show"
        });
    };

    handleEntered = () => {
        handleFuncProp(this.props.onShown)();
    }

    handleExit = () => {
        const body = document.body;
        body.style.overflow = this.bodyOverflow;
        body.style.paddingRight = this.bodyPaddingRight;

        this.setState({
            className: "",
        });
        handleFuncProp(this.props.onHide)();
    };

    handleExited = () => {
        this.setState({
            exited: true,
            className: "hide"
        });

        handleFuncProp(this.props.onHidden)();
    }


    render() {
        const {
            children,
            mountNode,
            placement,
            visible,
            width,
            height,
            backdrop,
            className,
            unmountOnClose,
            forceRender,
            ...otherProps
        } = this.props;
        const {
            className: stateClass,
            exited
        } = this.state;
        const PREFIX = "bs-drawer";
        const style: React.CSSProperties = {};

        if (placement === "left" || placement === "right") {
            style.width = width;
        } else {
            style.height = height;
        }

        if (!visible && unmountOnClose && exited) {
            return null;
        }

        const drawer = (
            <div className={
                classNames(
                    className,
                    PREFIX,
                    `${PREFIX}-${placement}`,
                    stateClass
                )
            } {...otherProps}>
                {
                    !!backdrop && (
                        <Fade
                            in={!!visible}>
                            <div
                                className="drawer-backdrop"
                                onClick={this.handleClickBackdrop} />
                        </Fade>
                    )
                }
                <CSSTransition
                    appear
                    timeout={150}
                    in={!!visible}
                    onEnter={this.handleEnter}
                    onEntered={this.handleEntered}
                    onEntering={this.handleEntering}
                    onExit={this.handleExit}
                    onExited={this.handleExited}>
                    <div
                        className="bs-drawer-body"
                        style={style}>
                        {children}
                    </div>
                </CSSTransition>
            </div >
        );

        if (!mountNode) {
            return drawer;
        }

        return (
            <Portal
                forceRender={forceRender}
                visible={visible}
                mountNode={mountNode}>
                {drawer}
            </Portal>
        );
    }

}