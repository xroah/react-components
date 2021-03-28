import * as React from "react"
import PropTypes from "prop-types"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import throttle from "reap-utils/lib/throttle"
import chainFunction from "reap-utils/lib/chain-function"
import Fade from "reap-transition/lib/Fade"
import NoTransition from "reap-transition/lib/NoTransition"
import {PopupContext} from "./contexts"
import Align from "./Align"
import Portal from "reap-utils/lib/react/portal"
import {
    PopupProps,
    PopupState,
    Position
} from "./interface"
import {noop} from "./utils"
import {TransitionProps} from "reap-transition/lib/Transition"

export default class Popup extends React.Component<PopupProps, PopupState> {
    private ref = React.createRef<HTMLDivElement>()
    private alignRef = React.createRef<Align>()
    private handleResize: () => void

    static propTypes = {
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
        transition: Fade,
        offset: [0, 0],
        defaultVisible: false,
    }

    constructor(props: PopupProps) {
        super(props)

        this.state = {
            //for popup arrow(tooltip, popover)
            arrowPos: {
                left: 0,
                top: 0
            },
            exited: true
        }
        this.handleResize = throttle(this._handleResize, 300)
    }

    componentDidUpdate(prevProps: PopupProps) {
        const {visible} = this.props

        if (prevProps.visible !== visible) {
            if (visible) {
                return this.addEvent()
            }

            this.removeEvent()
        }
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    handleClickOutSide = (evt: MouseEvent) => {
        const t = evt.target as HTMLElement
        const {
            onClickOutside
        } = this.props
        const parent = this.ref.current

        if (
            parent &&
            t !== parent &&
            !parent.contains(t)
        ) {
            handleFuncProp(onClickOutside)()
        }
    }

    handleArrowPosition = () => {
        const {
            props: {
                placement,
                target
            },
            ref: {
                current: child
            }
        } = this

        if (!target || !child) {
            return
        }

        const nRect = target.getBoundingClientRect()
        const cRect = child.getBoundingClientRect()
        const isArrowVertical = placement === "left" || placement === "right"
        const arrowPos: Position = {
            left: 0,
            top: 0
        }

        if (isArrowVertical) {
            arrowPos.top = nRect.top - cRect.top + nRect.height / 2
        } else {
            arrowPos.left = nRect.left - cRect.left + nRect.width / 2
        }

        this.setState({
            arrowPos
        })
    }

    updatePosition = () => {
        const alignRef = this.alignRef.current

        if (!alignRef) {
            return
        }

        const {
            left,
            top,
            placement
        } = alignRef.align()

        this.setState(
            {
                left,
                top,
                placement
            },
            () => {
                const {
                    leftOffset,
                    topOffset
                } = alignRef.adjustElement()

                this.setState(
                    {
                        left: left + leftOffset,
                        top: top + topOffset
                    },
                    this.handleArrowPosition
                )
            }
        )
    }

    handleMouseEvent = (evt: React.MouseEvent<HTMLElement>) => {
        const {
            onMouseLeave,
            onMouseEnter
        } = this.props

        handleFuncProp(evt.type === "mouseenter" ? onMouseEnter : onMouseLeave)(evt)
    }

    _handleResize = () => {
        this.updatePosition()
    }

    addEvent() {
        document.addEventListener("click", this.handleClickOutSide)
        window.addEventListener("resize", this.handleResize)
    }

    removeEvent() {
        document.removeEventListener("click", this.handleClickOutSide)
        window.removeEventListener("resize", this.handleResize)
    }

    handleEnter = (node: HTMLElement) => {
        const {
            onShow,
            transition
        } = this.props

        this.setState(
            {
                exited: false
            },
            () => {
                //update position, in case calc incorrectly(display: none)
                if (!transition) {
                    this.updatePosition()
                }
            }
        )

        handleFuncProp(onShow)(node)
    }

    handleEntering = () => {
        if (this.props.transition) {
            this.updatePosition()
        }
    }

    handleEntered = (node: HTMLElement) => {
        handleFuncProp(this.props.onShown)(node)
    }

    handleExit = (node: HTMLElement) => {
        handleFuncProp(this.props.onHide)(node)
    }

    handleExited = (node: HTMLElement) => {
        this.setState({
            exited: true
        })
        handleFuncProp(this.props.onHidden)(node)
    }

    renderChildren() {
        const {
            props: {
                children,
                elRef = null,
            },
            state: {
                left = 0,
                top = 0,
                arrowPos,
                placement,
                exited
            }
        } = this
        const _children = children as React.ReactElement

        const mouseEvent: any = {
            onMouseEnter: chainFunction(this.handleMouseEvent, _children.props.onMouseEnter),
            onMouseLeave: chainFunction(this.handleMouseEvent, _children.props.onMouseLeave)
        }
        const context: any = {
            arrowLeft: arrowPos.left,
            arrowTop: arrowPos.top,
            placement
        }

        return (
            <div
                className="reap-popup"
                style={{
                    display: exited ? "none" : "",
                    position: "absolute",
                    left,
                    top,
                    willChange: "transform",
                    zIndex: 99999
                }}
                ref={this.ref}>
                <div
                    className="reap-popup-body"
                    ref={elRef as any}
                    style={{overflow: "hidden"}}
                    {...mouseEvent}>
                    <PopupContext.Provider value={context}>
                        {_children}
                    </PopupContext.Provider>
                </div>
            </div>
        )
    }

    render() {
        const {
            props: {
                transition,
                visible,
                offset,
                alignment,
                placement: propPlacement,
                forceRender,
                target,
                popupMountNode,
                verticalCenter,
                transitionProps = {} as TransitionProps
            },
            state: {
                exited
            }
        } = this

        if (!target) {
            return null
        }
        
        const align = (
            <Align
                ref={this.alignRef}
                offset={offset}
                target={target}
                placement={propPlacement}
                alignment={alignment}
                verticalCenter={verticalCenter}>
                {this.renderChildren()}
            </Align>
        )
        const newTransitionProps: any = {
            appear: true,
            ...transitionProps,
            onEnter: chainFunction(this.handleEnter, transitionProps.onEnter || noop),
            onEntering: chainFunction(this.handleEntering, transitionProps.onEntering || noop),
            onEntered: chainFunction(this.handleEntered, transitionProps.onEntered || noop),
            onExit: chainFunction(this.handleExit, transitionProps.onExit || noop),
            onExited: chainFunction(this.handleExited, transitionProps.onExited || noop),
            in: !!visible
        }
        const element: any = transition ? transition : NoTransition
        const c = React.createElement(element, newTransitionProps, align)

        if (popupMountNode === null) {
            return c
        }

        return (
            <Portal
                mountNode={popupMountNode}
                visible={visible || !exited}
                forceRender={forceRender}>
                {c}
            </Portal>
        )
    }
}