import * as React from "react"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import getNextNodeByRef from "reap-utils/lib/react/get-next-node-by-ref"
import Placeholder from "reap-utils/lib/react/Placeholder"
import {
    action,
    OverlayProps,
    OverlayState
} from "./interface"
import Popup from "./Popup"
import Fade from "reap-transition/lib/Fade"
import {
    getAction,
    getHandlers,
    handleDelay
} from "./utils"
import omit from "reap-utils/lib/omit"
import {overlayPropTypes} from "./prop-types"

//for mouse out, prevent from closing when mouse out
const DELAY = 300

type _OverlayProps = OverlayProps<Overlay>

export default class Overlay extends React.Component<_OverlayProps, OverlayState> {
    private timer: any = null
    private delayTimer: any = null
    private ref = React.createRef<HTMLDivElement>()

    static propTypes = overlayPropTypes
    static defaultProps = {
        trigger: ["click"],
        delay: 0,
        placement: "bottom",
        offset: [0, 0],
        transition: Fade
    }

    constructor(props: _OverlayProps) {
        super(props)

        this.state = {
            visible: !!props.visible || !!props.defaultVisible,
            node: null
        }
    }

    static getDerivedStateFromProps(props: _OverlayProps, state: OverlayState) {
        if ("visible" in props) {
            return {
                visible: props.visible,
                node: state.node
            }
        }

        return state
    }

    componentDidMount() {
        this.setState({
            node: getNextNodeByRef(this.ref) as HTMLElement
        })
    }

    componentDidUpdate() {
        const newNode = getNextNodeByRef(this.ref) as HTMLElement

        if (newNode !== this.state.node) {
            this.setState({node: newNode})
        }
    }

    isControlled() {
        return "visible" in this.props
    }

    handleEvent = (evt: React.MouseEvent<HTMLElement & HTMLButtonElement>) => {
        const src = evt.currentTarget
        const type = evt.type

        //disabled
        if (
            src.disabled ||
            src.classList.contains("disabled")
        ) {
            return
        }

        this.clearTimer("timer")
        this.clearTimer("delayTimer")
        evt.preventDefault()
        evt.stopPropagation()

        switch (type) {
            case "click":
                this.toggle()
                break
            case "mouseenter":
            case "focus":
                this.open()
                break
            case "mouseleave":
                this.delayClose()
                break
            case "blur":
                this.close()
        }
    }

    clearTimer(timer: "timer" | "delayTimer") {
        if (this[timer] !== null) {
            clearTimeout(this[timer])
            this[timer] = null
        }
    }

    canTriggerByHover() {
        return getAction(this.props.trigger!).indexOf("hover") > -1
    }

    handlePopupMouseEnter = (evt: React.MouseEvent) => {
        const {popup} = this.props

        this.clearTimer("timer")
        handleFuncProp(popup.props.onMouseEnter)(evt)
    }

    handlePopupMouseLeave = (evt: React.MouseEvent) => {
        const {popup} = this.props

        if (this.canTriggerByHover()) {
            this.delayClose()
        }

        handleFuncProp(popup.props.onMouseLeave)(evt)
    }

    setVisible(visible: boolean) {
        this.setState({visible})
    }

    open = () => {
        if (this.state.visible || this.isControlled()) {
            return
        }

        const open = () => this.setVisible(true)
        const {show = 0} = handleDelay(this.props.delay)

        if (show > 0) {
            this.delayTimer = setTimeout(open, show)
        } else {
            open()
        }
    }

    close = () => {
        if (!this.state.visible || this.isControlled()) {
            return
        }

        const close = () => this.setVisible(false)
        let {hide = 0} = handleDelay(this.props.delay)

        if (hide > 0) {
            if (this.canTriggerByHover()) {
                hide = Math.abs(hide - DELAY)
            }

            this.delayTimer = setTimeout(close, hide)
        } else {
            close()
        }
    }

    toggle() {
        this.state.visible ? this.close() : this.open()
    }

    //for hover, prevent the popup from hiding when mouseout fires
    delayClose() {
        this.clearTimer("timer")

        this.timer = setTimeout(this.close, DELAY)
    }

    handleClickOutSide = () => {
        const {
            closeOnClickOutSide,
            onClickOutside
        } = this.props

        if (closeOnClickOutSide) {
            this.close()
        }

        handleFuncProp(onClickOutside)()
    }

    renderChildren() {
        const {
            children,
            trigger
        } = this.props
        const _children = React.Children.only(children) as React.ReactElement
        let eventHandlers = Object.create(null)

        //if controlled do not add these event handlers
        if (!this.isControlled()) {
            const handlers = getHandlers(_children, this.handleEvent)

            getAction(trigger!).forEach((a: action) => {
                if (a in handlers) {
                    eventHandlers = {
                        ...eventHandlers,
                        ...handlers[a]
                    }
                }
            })
        }

        //The event handlers of child will be overrode
        return React.cloneElement(_children, {...eventHandlers})
    }

    render() {
        const {
            props: {
                popup,
                popupProps,
                ...otherProps
            },
            state: {
                visible,
                node
            }
        } = this

        const newPopupProps = {
            ...popupProps,
            ...omit(
                otherProps,
                [
                    "extraRender",
                    "closeOnClickOutSide",
                    "trigger",
                    "delay",
                    "visible",
                    "defaultVisible",
                    "onClickOutside",
                    "children"
                ]
            ),
            onClickOutside: this.handleClickOutSide,
            visible,
            onMouseEnter: this.handlePopupMouseEnter,
            onMouseLeave: this.handlePopupMouseLeave,
            target: node,
            children: popup
        }

        return (
            <>
                <Placeholder ref={this.ref} />
                {this.renderChildren()}
                <Popup {...newPopupProps} />
            </>
        )
    }
}