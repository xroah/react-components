import * as React from "react"
import {
    getNextNodeByRef,
    handleFuncProp,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {isUndef} from "reap-utils/lib"
import {PopupProps, PopupState} from "./types"
import {OVERLAY_DELAY_TIMEOUT} from "./constants"
import PopupInner from "./PopupInner"
import {getAction, getDelay} from "./utils"
import {popupPropTypes} from "./prop-types"

export default class Popup extends
    React.Component<PopupProps, PopupState> {
    placeholderRef = React.createRef<HTMLDivElement>()
    delayTimer: number | null = null

    overlayRendered = false
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
        trigger: "click"
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

    clearTimer() {
        if (this.delayTimer !== null) {
            window.clearTimeout(this.delayTimer)

            this.delayTimer = null
        }
    }

    isIncludeHover() {
        return getAction(this.props.trigger).indexOf("hover") >= 0
    }

    handleOverlayMouseEnterOrLeave = (evt: React.MouseEvent) => {
        if (!this.isIncludeHover()) {
            return
        }

        this.clearTimer()

        if (evt.type === "mouseleave") {
            this.delayHide()
        }
    }

    handleMouseEnterOrLeave = (evt: React.MouseEvent) => {
        const child = this.props.children as React.ReactElement

        this.clearTimer()

        if (evt.type === "mouseenter") {
            handleFuncProp(child.props.onMouseEnter)(evt)
            this.delayShow()
        } else {
            handleFuncProp(child.props.onMouseLeave)(evt)
            this.delayHide()
        }
    }

    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        const child = this.props.children as React.ReactElement

        handleFuncProp(child.props.onClick)(evt)

        if (this.state.visible) {
            this.delayHide()
        } else {
            this.delayShow()
        }
    }

    handleFocusOrBlur = (evt: React.FocusEvent) => {
        const child = this.props.children as React.ReactElement

        if (evt.type === "focus") {
            handleFuncProp(child.props.onFocus)(evt)
            this.delayShow()
        } else {
            handleFuncProp(child.props.onBlur)(evt)
            this.delayHide()
        }
    }

    getHandlers() {
        type Handlers = React.HTMLAttributes<HTMLElement>
        let handlers: Handlers = {}
        const setHandler = (
            keys: Array<keyof Handlers>,
            handler: Function
        ) => keys.forEach(k => handlers[k] = handler)

        // not controlled
        if (!("visible" in this.props)) {
            const actions = getAction(this.props.trigger)

            for (let t of actions) {
                switch (t) {
                    case "click":
                        setHandler(["onClick"], this.handleClick)
                        break
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
                }
            }
        }

        return handlers
    }

    show() {
        this.setState({visible: true})
    }

    hide() {
        this.setState({visible: false})
    }

    delayShow() {
        if (this.state.visible) {
            return
        }

        const {show} = getDelay(this.props.delay)

        if (show > 0) {
            this.delayTimer = window.setTimeout(
                () => this.show(),
                show
            )

            return
        }

        this.show()
    }

    delayHide() {
        if (!this.state.visible) {
            return
        }

        const {hide} = getDelay(this.props.delay)
        const includeHover = this.isIncludeHover()
        let timeout: number = hide

        if (!includeHover) {
            if (!timeout) {
                this.hide()

                return
            }
        }

        if (timeout < OVERLAY_DELAY_TIMEOUT) {
            timeout = OVERLAY_DELAY_TIMEOUT
        }

        this.delayTimer = window.setTimeout(
            () => this.hide(),
            timeout
        )
    }

    getTarget = () => {
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
                    {...restProps}>
                    {overlay}
                </PopupInner>
                <Placeholder ref={this.placeholderRef} />
                {
                    React.cloneElement(
                        child,
                        {
                            ...this.getHandlers()
                        }
                    )
                }
            </>
        )
    }
}