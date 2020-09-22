import * as React from "react"
import PropTypes from "prop-types"
import Portal from "../Common/Portal"
import CSSTransition from "../Common/CSSTransition"
import {CommonProps} from "../Common/CommonPropsInterface"
import {
    classNames,
    handleFuncProp,
    getScrollBarWidth,
    getScrollParent
} from "../utils"
import Fade from "../Common/Fade"
import "./style/index.scss"

type placement = "left" | "top" | "right" | "bottom"

interface DrawerProps extends CommonProps<HTMLDivElement> {
    visible?: boolean
    autoFocus?: boolean
    keyboard?: boolean
    width?: number | string
    height?: number | string
    placement?: placement
    backdrop?: boolean | "static"
    forceRender?: boolean
    unmountOnClose?: boolean
    onShow?: Function
    onShown?: Function
    onHide?: Function
    onHidden?: Function
    onClose?: Function
}

interface DrawerState {
    className?: string
    exited?: boolean
}

export default class Drawer extends React.Component<DrawerProps, DrawerState> {

    static defaultProps = {
        width: 256,
        height: 256,
        placement: "left",
        visible: false,
        backdrop: true,
        unmountOnClose: false,
        forceRender: false,
        autoFocus: true,
        keyboard: true
    }
    static propTypes = {
        visible: PropTypes.bool,
        forceRender: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        keyboard: PropTypes.bool,
        autoFocus: PropTypes.bool,
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
    }
    private bodyPaddingRight: any = ""
    private bodyOverflow: any = ""
    private startX = 0
    private startY = 0
    private ref = React.createRef<HTMLDivElement>()

    constructor(props: DrawerProps) {
        super(props)

        this.state = {
            className: props.visible ? "show" : "hide"
        }
    }

    componentDidUpdate(prevProps: DrawerProps) {
        const {
            visible 
        } = this.props
        const el = this.ref.current as HTMLElement

        if (visible !== prevProps.visible) {
            if (visible) {
                el.addEventListener("touchmove", this.preventTouchMove)
                return
            }

            el.removeEventListener("touchmove", this.preventTouchMove)
        }
    }

    canScroll(el: HTMLElement, disX: number, disY: number) {
        const max = Math.max(Math.abs(disX), Math.abs(disY))
        const isScrollHorizontal = max === Math.abs(disX)
        const isScrollVertical = max === Math.abs(disY)
        const maxDisX = el.scrollWidth - el.clientWidth
        const maxDisY = el.scrollHeight - el.clientHeight
        const scrollLeft = el.scrollLeft
        const scrollTop = el.scrollTop
        
        if (
            
            isScrollHorizontal && (
                disX > 0 && scrollLeft <= 0 ||
                    disX < 0 && scrollLeft >= maxDisX
            )
             ||
            
                isScrollVertical && (
                    disY > 0 && scrollTop <= 0 ||
                    disY < 0 && scrollTop >= maxDisY
                )
            
        ) {
            return false
        }

        return true
    }

    preventTouchMove = (evt: TouchEvent) => {
        const touches = evt.touches

        if (touches.length > 1 || !evt.cancelable) {
            return
        }

        const currentX = touches[0].clientX
        const currentY = touches[0].clientY
        const target = evt.target as HTMLElement
        const el = this.ref.current as HTMLElement
        const disX = currentX - this.startX
        const disY = currentY - this.startY

        this.startX = currentX
        this.startY = currentY

        if (
            target.classList.contains("bs-drawer-backdrop") ||
            target === el ||
            !this.canScroll(getScrollParent(target, el), disX, disY)
        ) {
            evt.preventDefault()
        }

        evt.stopPropagation()
    }

    handleTouchStart = (evt: React.TouchEvent<HTMLElement>) => {
        const touches = evt.touches

        if (touches.length > 1) {
            return
        }
        
        this.startX = touches[0].clientX
        this.startY = touches[0].clientY
    }

    focus = () => {
        const current = this.ref.current as HTMLElement
        
        current && current.focus()
    }

    handleClickBackdrop = () => {
        const {
            onClose,
            backdrop
        } = this.props

        if (backdrop && backdrop !== "static") {
            handleFuncProp(onClose)()
        }
        else {
            this.focus()
        }
    }

    handleKeyDown = (evt: React.KeyboardEvent) => {
        const key = evt.key.toLowerCase()
        const {
            keyboard,
            onClose
        } = this.props

        if (keyboard && (key === "escape" || key === "key")) {
            handleFuncProp(onClose)()
        }
    }

    handleEnter = () => {
        const hasScrollbar = document.documentElement.clientWidth < window.innerWidth
        const body = document.body
        this.bodyOverflow = body.style.overflow
        this.bodyPaddingRight = body.style.paddingRight
        body.style.overflow = "hidden"

        if (hasScrollbar) {
            const pr = parseFloat(getComputedStyle(body).getPropertyValue("padding-right"))
            body.style.paddingRight = `${pr + getScrollBarWidth()}px`
        }

        this.setState({
            exited: false
        })
        handleFuncProp(this.props.onShow)()
    }

    handleEntering = () => {
        this.setState({
            className: "show"
        })
    }

    handleEntered = () => {
        this.focus()
        handleFuncProp(this.props.onShown)()
    }

    handleExit = () => {
        this.setState({
            className: "",
        })
        handleFuncProp(this.props.onHide)()
    }

    handleExited = () => {
        const body = document.body
        body.style.overflow = this.bodyOverflow
        body.style.paddingRight = this.bodyPaddingRight

        this.setState({
            exited: true
        })
        handleFuncProp(this.props.onHidden)()
    }

    render() {
        const {
            children,
            placement: placementProp,
            visible,
            width,
            height,
            backdrop,
            className,
            unmountOnClose,
            forceRender,
            ...otherProps
        } = this.props
        const {
            className: stateClass,
            exited
        } = this.state
        const PREFIX = "bs-drawer"
        const style: React.CSSProperties = {
        }

        if (placementProp === "left" || placementProp === "right") {
            style.width = width
            style.height = window.innerHeight
        }
        else {
            style.width = window.innerWidth
            style.height = height
        }

        if (!visible && unmountOnClose && exited) {
            return null
        }

        delete otherProps.keyboard
        delete otherProps.autoFocus

        return (
            <Portal
                forceRender={forceRender}
                visible={visible}>
                <div
                    ref={this.ref}
                    onKeyDown={this.handleKeyDown}
                    onTouchStart={this.handleTouchStart}
                    className={
                        classNames(
                            className,
                            PREFIX,
                            `${PREFIX}-${placementProp}`,
                            stateClass
                        )
                    }
                    {...otherProps}>
                    {
                        !!backdrop && 
                            <Fade
                                unmountOnExit
                                in={!!visible}>
                                <div
                                    className="bs-drawer-backdrop"
                                    onClick={this.handleClickBackdrop} />
                            </Fade>
                        
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
                            style={style}
                            className="bs-drawer-content">
                            {children}
                        </div>
                    </CSSTransition>
                </div >
            </Portal>
        )
    }

}