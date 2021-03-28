import * as React from "react"
import chainFunction from "reap-utils/lib/chain-function"
import isUndef from "reap-utils/lib/is-undef"
import getNextNodeByRef from "reap-utils/lib/react/get-next-node-by-ref"
import Placeholder from "reap-utils/lib/react/Placeholder"
import {
    OverlayProps,
    OverlayState
} from "./interface"
import Popup from "./Popup"
import Fade from "reap-transition/lib/Fade"
import PropTypes from "prop-types"
import {
    getAction,
    handleDelay,
    noop
} from "./utils"
import omit from "reap-utils/lib/omit"

const actionType = ["hover", "click", "focus"]

type _OverlayProps = OverlayProps<Overlay>

export default class Overlay extends React.Component<_OverlayProps, OverlayState> {
    private timer: any = null
    private delayTimer: any = null
    private ref = React.createRef<HTMLDivElement>()

    static propTypes = {
        trigger: PropTypes.oneOfType([
            PropTypes.oneOf(actionType),
            PropTypes.arrayOf(PropTypes.oneOf(actionType))
        ]),
        delay: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.shape({
                show: PropTypes.number,
                hide: PropTypes.number
            })
        ]),
        placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        transition: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.instanceOf(React.Component)
        ]),
        transitionProps: PropTypes.object,
        offset: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.number)
        ]),
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func,
        alignment: PropTypes.oneOf(["left", "center", "right"])
    }
    static defaultProps = {
        trigger: ["click"],
        delay: 0,
        placement: "bottom",
        offset: [0, 0],
        defaultVisible: false,
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
        const node = getNextNodeByRef(this.ref) as HTMLElement

        this.setState({
            node
        })
    }

    componentDidUpdate() {
        const {node} = this.state
        const newNode = getNextNodeByRef(this.ref) as HTMLElement

        if (newNode !== node) {
            this.setState({
                node: newNode
            })
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
                break
        }
    }

    clearTimer(timer: "timer" | "delayTimer") {
        if (this[timer] !== null) {
            clearTimeout(this[timer])
            this[timer] = null
        }
    }

    handlePopupMouseEnter = () => {
        this.clearTimer("timer")
    }

    handlePopupMouseLeave = () => {
        const actions = getAction(this.props.trigger!)

        if (actions.indexOf("hover") > -1) {
            this.delayClose()
        }
    }

    setVisible = (visible: boolean) => {
        this.setState({
            visible
        })
    }

    open = () => {
        if (this.state.visible || this.isControlled()) {
            return
        }

        const open = () => this.setVisible(true)
        const {
            show = 0
        } = handleDelay(this.props.delay)

        this.delayTimer = setTimeout(open, show)

    }

    close = () => {
        if (!this.state.visible || this.isControlled()) {
            return
        }

        const close = () => this.setVisible(false)
        const {
            hide = 0
        } = handleDelay(this.props.delay)

        this.delayTimer = setTimeout(close, hide)
    }

    toggle = () => {
        const {
            visible
        } = this.state

        visible ? this.close() : this.open()
    }

    //for hover, prevent the popup from hiding when mouseout fires
    delayClose() {
        const {
            hide = 0
        } = handleDelay(this.props.delay)

        this.clearTimer("timer")

        this.timer = setTimeout(this.close, hide > 100 ? 0 : 150)
    }

    handleClickOutSide = () => {
        if (this.props.closeOnClickOutSide) {
            this.close()
        }
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
            const handler = this.handleEvent
            const {
                onClick = noop,
                onMouseEnter = noop,
                onMouseLeave = noop,
                onBlur = noop,
                onFocus = noop
            } = _children.props
            const actionMap: any = {
                hover: {
                    onMouseEnter: chainFunction(handler, onMouseEnter),
                    onMouseLeave: chainFunction(handler, onMouseLeave)
                },
                click: {
                    onClick: chainFunction(handler, onClick)
                },
                focus: {
                    onFocus: chainFunction(handler, onFocus),
                    onBlur: chainFunction(handler, onBlur)
                }
            }

            getAction(trigger!).forEach((a: string) => {
                if (a in actionMap) {
                    eventHandlers = {
                        ...eventHandlers,
                        ...actionMap[a]
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
                children,
                onClickOutside = noop,
                popupProps,
                ...otherProps
            },
            state: {
                visible,
                node
            }
        } = this

        if (isUndef(popup)) {
            return children
        }

        const newPopupProps = {
            ...omit(otherProps, ["extraRender", "closeOnClickOutSide"]),
            onClickOutside: chainFunction(this.handleClickOutSide, onClickOutside),
            ...popupProps
        }

        return (
            <>
                <Placeholder ref={this.ref} />
                {this.renderChildren()}
                <Popup
                    visible={visible}
                    onMouseEnter={this.handlePopupMouseEnter}
                    onMouseLeave={this.handlePopupMouseLeave}
                    target={node}
                    {...newPopupProps}>
                    {popup}
                </Popup>
            </>
        )
    }

}