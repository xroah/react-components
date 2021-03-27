import * as React from "react"
import omit from "reap-utils/lib/omit"
import chainFunction from "reap-utils/lib/chain-function"
import isUndef from "reap-utils/lib/is-undef"
import Popup, {
    PopupCommonProps,
    PopupProps
} from "./Popup"
import PropTypes from "prop-types"
import {findDOMNode} from "react-dom"
import {handleDelay, DelayObject} from "./utils"

export type action = "hover" | "click" | "contextmenu" | "focus"

export interface CommonProps extends PopupCommonProps {
    trigger?: action[] | action
    delay?: number | DelayObject
}

export interface OverlayProps extends CommonProps, PopupProps {
    popup: React.ReactNode
    popupProps?: React.HTMLAttributes<HTMLElement>
    extraRender?: (overlay: Overlay) => JSX.Element
}

interface OverlayState {
    visible: boolean
    node: HTMLElement | null
}

const actionType = ["hover", "click", "focus"]

export default class Overlay extends React.Component<OverlayProps, OverlayState> {
    private timer: any
    private delayTimer: any = null

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
        ])
    }

    constructor(props: OverlayProps) {
        super(props)

        this.state = {
            visible: !!props.visible || !!props.defaultVisible,
            node: null
        }
    }

    static getDerivedStateFromProps(props: OverlayProps, state: OverlayState) {
        if ("visible" in props) {
            return {
                visible: props.visible,
                node: state.node
            }
        }

        return state
    }

    componentDidMount() {
        const node = findDOMNode(this) as HTMLElement

        this.setState({
            node
        })
    }

    getAction() {
        const {
            trigger
        } = this.props
        let actions: Array<any> = []

        if (Array.isArray(trigger)) {
            actions = trigger
        } else {
            actions = [trigger]
        }

        return actions
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

        this.clearTimer()
        this.clearDelayTimer()
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

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }

    handlePopupMouseEnter = () => {
        this.clearTimer()
    }

    handlePopupMouseLeave = () => {
        const actions = this.getAction()

        if (actions.indexOf("hover") > -1) {
            this.delayClose()
        }
    }

    clearDelayTimer() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer)
            this.delayTimer = null
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

        if (!isUndef(this.timer)) {
            clearTimeout(this.timer)
            this.timer = null
        }

        this.timer = setTimeout(this.close, hide > 100 ? 0 : 150)
    }

    renderChildren() {
        const noop = () => { }
        const {
            children,
            ...otherProps
        } = this.props
        let eventHandlers = Object.create(null)
        const restProps = omit(
            otherProps,
            [
                "popup",
                "elRef",
                "popupProps",
                "placement",
                "alignment",
                "offset",
                "onClickOutside",
                "fade",
                "unmountOnExit",
                "verticalCenter",
                "trigger",
                "visible",
                "defaultVisible",
                "delay",
                "onShow",
                "onShown",
                "onHide",
                "onHidden",
                "popupMountNode"
            ]
        )

        //if controlled do not add these event handlers
        if (!this.isControlled()) {
            const handler = this.handleEvent
            const {
                onClick = noop,
                onMouseEnter = noop,
                onMouseLeave = noop,
                onBlur = noop,
                onFocus = noop
            } = (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props
            const actionMap: any = {
                hover: {
                    onMouseEnter: chainFunction(handler, restProps.onMouseEnter || onMouseEnter),
                    onMouseLeave: chainFunction(handler, restProps.onMouseLeave || onMouseLeave)
                },
                click: {
                    onClick: chainFunction(handler, restProps.onClick || onClick)
                },
                focus: {
                    onFocus: chainFunction(handler, restProps.onFocus || onFocus),
                    onBlur: chainFunction(handler, restProps.onBlur || onBlur)
                }
            }
            const actions = this.getAction()

            actions.forEach((a: string) => {
                if (a in actionMap) {
                    eventHandlers = {
                        ...eventHandlers,
                        ...actionMap[a]
                    }
                }
            })
        }

        //The event handlers of child will be overrode
        return React.cloneElement(
            children as React.ReactElement,
            {
                ...restProps,
                ...eventHandlers
            }
        )
    }

    render() {
        const {
            props: {
                children,
                popup,
                elRef,
                popupProps,
                placement,
                alignment,
                offset,
                fade,
                onShow,
                onShown,
                onHidden,
                onHide,
                unmountOnExit,
                verticalCenter,
                onClickOutside,
                popupMountNode,
                extraRender
            },
            state: {
                visible,
                node
            }
        } = this

        if (isUndef(popup)) {
            return children
        }

        const props = {
            fade,
            offset,
            elRef,
            placement,
            alignment,
            unmountOnExit,
            verticalCenter,
            onShow,
            onShown,
            onHide,
            onHidden,
            onClickOutside,
            popupMountNode,
            ...popupProps
        }

        return (
            <>
                {this.renderChildren()}
                {extraRender ? extraRender(this) : null}
                {/* <ModalContext.Consumer>
                    {
                        //when placed within modals, dismiss once modals are closed
                        ({
                            isModal, visible: mVisible
                        }) => {
                            if (visible && isModal && !mVisible) {
                                this.close()
                            }

                            return null
                        }
                    }
                </ModalContext.Consumer> */}
                <Popup
                    visible={visible}
                    onMouseEnter={this.handlePopupMouseEnter}
                    onMouseLeave={this.handlePopupMouseLeave}
                    target={node}
                    {...props}>
                    {popup}
                </Popup>
            </>
        )
    }

}