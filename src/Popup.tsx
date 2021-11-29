import * as React from "react"
import {
    getNextNodeByRef,
    only,
    Placeholder
} from "reap-utils/lib/react"
import {isUndef} from "reap-utils/lib"
import {CommonProps, ValueOf} from "./types"
import {actions} from "./constants"
import PopupInner from "./PopupInner"
import {getAction} from "./utils"

type Trigger = ValueOf<typeof actions>

interface PopupProps extends CommonProps {
    children: React.ReactElement
    overlay?: React.ReactNode
    trigger?: Trigger | Trigger[]
}

interface State {
    visible: boolean
    x: number
    y: number
    mountNode: null | HTMLElement
}

const OVERLAY_DELAY_TIMEOUT = 100

export default class Popup extends React.Component<PopupProps, State> {
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

    static getDerivedStateFromProps(nextProps: PopupProps, nextState: State) {
        if ("visible" in nextProps) {
            nextState.visible = !!nextProps.visible
        }

        return nextState
    }

    clearDelayTimer() {
        if (this.delayTimer !== null) {
            window.clearTimeout(this.delayTimer)

            this.delayTimer = null
        }
    }

    handleOverlayMouseEnterOrLeave = (evt: React.MouseEvent) => {
        if (getAction(this.props.trigger).indexOf("hover") < 0) {
            return
        }

        if (evt.type === "mouseenter") {
            this.clearDelayTimer()
        } else {
            this.delayHide()
        }
    }

    handleMouseEnterOrLeave = (evt: React.MouseEvent) => {
        const child = this.props.children as React.ReactElement
        const {
            onMouseEnter,
            onMouseLeave
        } = child.props

        if (evt.type === "mouseenter") {
            if (typeof onMouseEnter === "function") {
                onMouseEnter(evt)
            }

            this.clearDelayTimer()
            this.show()
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

        this.setState({visible: !this.state.visible})
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

            this.show()
        } else {
            if (typeof onBlur === "function") {
                onBlur(evt)
            }

            this.hide()
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

    delayHide() {
        this.delayTimer = window.setTimeout(
            () => this.hide(),
            OVERLAY_DELAY_TIMEOUT
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