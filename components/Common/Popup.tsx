import * as React from "react"
import PropTypes from "prop-types"
import {
    handleFuncProp,
    throttle,
    reflow
} from "../utils"
import Fade from "./Fade"
import {PopupContext} from "./contexts"
import Align from "./Align"
import NoTransition from "./NoTransition"
import Portal from "./Portal"
import {CommonPropsWithoutTitle} from "./CommonPropsInterface"
import omitProps from "../utils/omitProps"

export type position = "top" | "right" | "bottom" | "left"

export interface PopupCommonProps extends CommonPropsWithoutTitle<HTMLElement> {
    placement?: position
    visible?: boolean
    popupMountNode?: HTMLElement | string
    offset?: number | number[]
    defaultVisible?: boolean
    fade?: boolean
    forceRender?: boolean
    onShow?: Function
    onShown?: Function
    onHide?: Function
    onHidden?: Function
}

interface Position {
    left: number
    top: number
}

interface PopupState {
    arrowPos: Position
    placement?: position
    left?: number
    top?: number
    display?: "none" | "block"
    exited?: boolean
}

export interface PopupProps extends PopupCommonProps {
    alignment?: "left" | "center" | "right"
    //below props are internal temporarily
    unmountOnExit?: boolean
    target?: HTMLElement | null//calc position based on this element
    verticalCenter?: boolean
    onClickOutside?: Function
}

export default class Popup extends React.Component<PopupProps, PopupState> {

    private ref = React.createRef<HTMLDivElement>()
    private alignRef = React.createRef<Align>()

    static propTypes = {
        placement: PropTypes.oneOf(["top", "bottom", "left", "right"]),
        fade: PropTypes.bool,
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
        fade: true,
        offset: [0, 0],
        defaultVisible: false
    }

    constructor(props: PopupProps) {
        super(props)

        this.state = {
            arrowPos: {//for popup arrow(tooltip, popover)
                left: 0,
                top: 0
            }
        }
        this.handleResize = throttle(this.handleResize)
    }

    componentDidUpdate(prevProps: PopupProps) {
        const {
            props: {
                visible
            }
        } = this

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
        }
        else {
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
            left, top, placement
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
            onMouseLeave, onMouseEnter
        } = this.props

        evt.type === "mouseenter" ? handleFuncProp(onMouseEnter)(evt)
            : handleFuncProp(onMouseLeave)(evt)
    }

    handleResize = () => {
        requestAnimationFrame(this.updatePosition)
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
            onShow
        } = this.props

        this.setState({
            display: "block",
            exited: false
        })

        handleFuncProp(onShow)(node)
    }

    handleEntered = (node: HTMLElement) => {
        const {
            onShown
        } = this.props

        handleFuncProp(onShown)(node)
    }

    handleEntering = (node: HTMLElement) => {
        //update position, in case calc incorrectly(invisible) when fade in
        node && reflow(node)
        this.handleResize()
    }

    handleExit = (node: HTMLElement) => {
        const {
            onHide
        } = this.props

        handleFuncProp(onHide)(node)
    }

    handleExited = (node: HTMLElement) => {
        const {
            onHidden
        } = this.props
        this.setState({
            display: "none",
            exited: true
        })

        handleFuncProp(onHidden)(node)
    }

    render() {
        const {
            props: {
                children,
                fade,
                visible,
                offset,
                alignment,
                placement: propPlacement,
                unmountOnExit,
                forceRender,
                target,
                popupMountNode,
                verticalCenter,
                ...otherProps
            },
            state: {
                left,
                top,
                arrowPos,
                placement,
                display,
                exited
            }
        } = this
        const _children = children as React.ReactElement

        /* if (typeof children === "function") {
            _children = children()
        } */

        if (
            !children ||
            !target ||
            !visible && unmountOnExit && exited
        ) {
            return null
        }

        omitProps(
            otherProps,
            [
                "onClickOutside",
                "defaultVisible",
                "onShow",
                "onShown",
                "onHide",
                "onHidden"
            ]
        )

        const mouseEvent = {
            onMouseEnter: this.handleMouseEvent,
            onMouseLeave: this.handleMouseEvent
        }
        const context: any = {
            arrowLeft: arrowPos.left,
            arrowTop: arrowPos.top,
            placement
        }
        const child = (
            <div style={{
                display,
                position: "absolute",
                left: 0,
                top: 0,
                willChange: "transform",
                transform: `translate3d(${left}px, ${top}px, 0)`,
                zIndex: 99999
            }} ref={this.ref}>
                <div {...{
                    ...mouseEvent,
                    ...otherProps
                }}>
                    <PopupContext.Provider value={context}>
                        {_children}
                    </PopupContext.Provider>
                </div>
            </div>
        )
        const align = (
            <Align
                ref={this.alignRef}
                offset={offset}
                target={target}
                placement={propPlacement}
                alignment={alignment}
                verticalCenter={verticalCenter}>
                {child}
            </Align>
        )
        const transitionProps = {
            appear: true,
            onEnter: this.handleEnter,
            onEntering: this.handleEntering,
            onEntered: this.handleEntered,
            onExit: this.handleExit,
            onExited: this.handleExited,
            in: !!visible
        }

        return (
            <Portal
                mountNode={popupMountNode}
                visible={visible}
                forceRender={forceRender}>
                {
                    fade ?
                        <Fade {...transitionProps}>{align}</Fade> :
                        <NoTransition {...transitionProps}>{align}</NoTransition>
                }
            </Portal>
        )
    }
}