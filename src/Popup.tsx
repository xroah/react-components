import * as React from "react"
import {
    getNextNodeByRef,
    handleFuncProp,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {isUndef} from "reap-utils/lib"
import {
    AreaString,
    PopupProps,
    PopupState
} from "./types"
import {OVERLAY_DELAY_TIMEOUT} from "./constants"
import PopupInner from "./PopupInner"
import {getAction, getDelay} from "./utils"
import {popupPropTypes} from "./prop-types"

export default class Popup extends
    React.Component<PopupProps, PopupState> {
    private placeholderRef = React.createRef<HTMLDivElement>()
    private delayTimer: number | null = null

    state = {
        visible: false,
        x: 0,
        y: 0,
        mountNode: null
    }

    static propTypes = popupPropTypes
    static defaultProps = {
        mountNode: "body",
        placement: "top",
        verticalAlign: "top",
        animation: true,
        trigger: "click",
        autoClose: true,
        escClose: true
    }

    static getDerivedStateFromProps(
        nextProps: PopupProps,
        nextState: PopupState
    ) {
        if ("visible" in nextProps) {
            nextState.visible = !!nextProps.visible
        }

        return nextState
    }

    componentWillUnmount() {
        this.clearTimer()
    }

    private clearTimer() {
        if (this.delayTimer !== null) {
            window.clearTimeout(this.delayTimer)

            this.delayTimer = null
        }
    }

    private isIncludeHover() {
        return getAction(this.props.trigger).indexOf("hover") >= 0
    }

    private handleOverlayMouseEnterOrLeave = (evt: React.MouseEvent) => {
        if (!this.isIncludeHover()) {
            return
        }

        this.clearTimer()

        if (evt.type === "mouseleave") {
            this.delayHide()
        }
    }

    private createHandler<T = MouseEvent>(
        condition: (evt: T) => boolean,
        showHandlerName: string,
        hideHandlerName?: string
    ) {
        return (evt: T) => {
            const child = this.props.children as React.ReactElement

            this.clearTimer()

            if (condition(evt)) {
                handleFuncProp(child.props[showHandlerName])(evt)
                this.delayShow()
            } else {
                const name = hideHandlerName || showHandlerName

                handleFuncProp(child.props[name])(evt)
                this.delayHide()
            }
        }
    }

    private handleMouseEnterOrLeave = this.createHandler(
        e => e.type === "mouseenter",
        "onMouseEnter",
        "onMouseLeave"
    )

    private handleClick = this.createHandler(
        () => !this.state.visible,
        "onClick"
    )

    private handleFocusOrBlur = this.createHandler<React.FocusEvent>(
        e => e.type === "focus",
        "onFocus",
        "onBlur"
    )

    handleAutoClose = (v: AreaString) => {
        const {autoClose} = this.props

        if (
            (autoClose === true && v !== "toggle") ||
            (autoClose === "inside" && v === "inside") ||
            (autoClose === "outside" && v === "outside")
        ) {
            this.hide()
        }
    }

    private handleEscKeyDown = () => {
        this.hide()
    }

    private getHandlers() {
        type Handlers = React.HTMLAttributes<HTMLElement>
        let handlers: Handlers = {}
        const setHandler = (
            keys: Array<keyof Handlers>,
            handler: Function
        ) => keys.forEach(k => handlers[k] = handler)

        // not controlled
        if (!("visible" in this.props)) {
            const actions = getAction(this.props.trigger)

            for (let a of actions) {
                switch (a) {
                    case "hover":
                        setHandler(
                            ["onMouseEnter", "onMouseLeave"],
                            this.handleMouseEnterOrLeave
                        )
                        break
                    case "focus":
                        setHandler(
                            ["onFocus", "onBlur"],
                            this.handleFocusOrBlur
                        )
                        break
                    default:
                        // click
                        setHandler(["onClick"], this.handleClick)
                }
            }
        }

        return handlers
    }

    private show() {
        this.setState({visible: true})
    }

    private hide() {
        this.setState({visible: false})
    }

    private delayShow() {
        if (this.state.visible) {
            return
        }

        const {show: t} = getDelay(this.props.delay)
        const show = () => this.show()

        if (t > 0) {
            this.delayTimer = window.setTimeout(show, t)

            return
        }

        show()
    }

    private delayHide() {
        if (!this.state.visible) {
            return
        }

        let {hide: t} = getDelay(this.props.delay)
        const includeHover = this.isIncludeHover()
        const hide = () => this.hide()

        // if include hover, the overlay should delay
        // for interacting with the overlay
        if (!includeHover) {
            if (!t) {
                hide()

                return
            }
        }

        if (t < OVERLAY_DELAY_TIMEOUT) {
            t = OVERLAY_DELAY_TIMEOUT
        }

        this.delayTimer = window.setTimeout(hide, t)
    }

    private getTarget = () => {
        return getNextNodeByRef(this.placeholderRef)
    }

    render() {
        const {
            children,
            overlay,
            ...restProps
        } = this.props
        const child = only(children)

        if (isUndef(overlay)) {
            return child
        }

        return (
            <>
                <PopupInner
                    getTarget={this.getTarget}
                    visible={this.state.visible}
                    onMouseEnter={this.handleOverlayMouseEnterOrLeave}
                    onMouseLeave={this.handleOverlayMouseEnterOrLeave}
                    onEscKeyDown={this.handleEscKeyDown}
                    onClick={this.handleAutoClose}
                    {...restProps}>
                    {overlay}
                </PopupInner>
                <Placeholder ref={this.placeholderRef} />
                {React.cloneElement(child, {...this.getHandlers()})}
            </>
        )
    }
}