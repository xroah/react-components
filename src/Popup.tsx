import * as React from "react"
import {
    getNextNodeByRef,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {isUndef} from "reap-utils/lib"
import {PopupProps, PopupState} from "./types"
import {OVERLAY_DELAY_TIMEOUT} from "./constants"
import PopupInner from "./PopupInner"
import {getAction, getDelay} from "./utils"

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
        const {
            onMouseEnter,
            onMouseLeave
        } = child.props

        this.clearTimer()

        if (evt.type === "mouseenter") {
            if (typeof onMouseEnter === "function") {
                onMouseEnter(evt)
            }

            this.delayShow()
        } else {
            if (typeof onMouseLeave === "function") {
                onMouseLeave(evt)
            }

            this.delayHide()
        }
    }

    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        const child = this.props.children as React.ReactElement

        if (typeof child.props.onClick === "function") {
            child.props.onClick(evt)
        }

        if (this.state.visible) {
            this.delayHide()
        } else {
            this.delayShow()
        }
    }

    handleFocusOrBlur = (evt: React.FocusEvent) => {
        const child = this.props.children as React.ReactElement
        const {
            onFocus,
            onBlur
        } = child.props

        if (evt.type === "focus") {
            if (typeof onFocus === "function") {
                onFocus(evt)
            }

            this.delayShow()
        } else {
            if (typeof onBlur === "function") {
                onBlur(evt)
            }

            this.delayHide()
        }
    }

    getHandlers() {
        let handlers: React.HTMLAttributes<HTMLElement> = {}

        // controlled
        if ("visible" in this.props) {
            return
        }

        getAction(this.props.trigger).forEach(t => {
            switch (t) {
                case "click":
                    handlers.onClick = this.handleClick
                    break
                case "hover":
                    handlers.onMouseEnter = this.handleMouseEnterOrLeave
                    handlers.onMouseLeave = this.handleMouseEnterOrLeave
                    break
                case "focus":
                    handlers.onFocus = this.handleFocusOrBlur
                    handlers.onBlur = this.handleFocusOrBlur
            }
        })

        return handlers
    }

    show() {
        if (this.state.visible) {
            return
        }

        this.setState({visible: true})
    }

    hide() {
        if (!this.state.visible) {
            return
        }

        this.setState({visible: false})
    }

    delayShow() {
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