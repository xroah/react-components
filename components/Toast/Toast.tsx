import * as React from "react"
import PropTypes from "prop-types"
import Fade from "../Common/Fade"
import {
    classNames,
    handleFuncProp
} from "../utils"
import NoTransition from "../Common/NoTransition"
import { CommonPropsWithoutTitle } from "../Common/CommonPropsInterface"
import omitProps from "../utils/omitProps"

export interface ToastProps extends CommonPropsWithoutTitle<HTMLDivElement> {
    title?: string | React.ReactNode
    icon?: React.ReactElement
    extra?: string | React.ReactNode
    autoHide?: boolean
    closable?: boolean
    header?: string | React.ReactNode
    delay?: number
    fade?: boolean
    visible?: boolean
    onClose?: Function
    onShow?: Function
    onShown?: Function
    onHide?: Function
    onHidden?: Function
}

const stringOrNode = PropTypes.oneOfType([PropTypes.string, PropTypes.node])

export default class Toast extends React.Component<ToastProps> {

    private timer: any = null

    static propTypes = {
        title: stringOrNode,
        icon: PropTypes.element,
        extra: stringOrNode,
        autoHide: PropTypes.bool,
        closable: PropTypes.bool,
        header: stringOrNode,
        delay: PropTypes.number,
        fade: PropTypes.bool,
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func
    }
    static defaultProps = {
        delay: 3000,
        fade: true,
        visible: false,
        closable: true,
        autoHide: true
    }

    componentDidMount() {
        if (this.props.visible) {
            this.componentDidUpdate({
            })
        }
    }

    componentWillUnmount() {
        this.clearTimer()
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }

    componentDidUpdate(prevProps: ToastProps) {
        const {
            autoHide,
            delay,
            visible
        } = this.props

        if (visible && visible !== prevProps.visible && autoHide) {
            this.timer = setTimeout(this.handleClose, delay as number)
        }
    }

    handleClose = () => {
        const {
            onClose,
            visible
        } = this.props

        this.clearTimer()

        if (!visible) {
            return
        }

        handleFuncProp(onClose)()
    }

    handleCallback = (cb: "onShow" | "onShown" | "onHide" | "onHidden") => {
        return () => {
            const props = this.props as any

            handleFuncProp(props[cb])()
        }
    }

    renderHeader() {
        let {
            header,
            title,
            icon,
            extra,
            closable
        } = this.props

        if (header === null) {
            return null
        }

        if (header === undefined) {

            //set default header
            header = (
                <>
                    {icon}
                    {
                        !!title && <strong className="ml-2">{title}</strong>

                    }
                    {
                        !!extra && <small className="text-muted ml-auto">{extra}</small>

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
            )
        }

        return (
            <div className="toast-header">
                {header}
            </div>
        )
    }

    render() {
        const {
            className,
            children,
            visible,
            fade,
            icon,
            ...otherProps
        } = this.props

        omitProps(
            otherProps,
            [
                "extra",
                "autoHide",
                "closable",
                "header",
                "delay",
                "onClose",
                "title",
                "onShow",
                "onShown",
                "onHide",
                "onHidden"
            ]
        )
        
        const toast =
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

        const transitionProps = {
            in: !!visible,
            unmountOnExit: true,
            onEnter: this.handleCallback("onShow"),
            onEntered: this.handleCallback("onShown"),
            onExit: this.handleCallback("onHide"),
            onExited: this.handleCallback("onHidden")
        }

        return (
            fade ?
                <Fade {...transitionProps}>{toast}</Fade> :
                <NoTransition showClass="show" {...transitionProps}>{toast}</NoTransition>
        )
    }

}