import * as React from "react"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import throttle from "reap-utils/lib/throttle"
import chainFunction from "reap-utils/lib/chain-function"
import NoTransition from "reap-transition/lib/NoTransition"
import Align from "./Align"
import Portal from "reap-utils/lib/react/portal"
import {
    PopupProps,
    PopupState
} from "./interface"
import {getArrowPosition, noop} from "./utils"
import {TransitionProps} from "reap-transition/lib/Transition"
import PopupInner from "./PopupInner"

interface _PopupProps extends PopupProps {
    onMouseEnter?: React.MouseEventHandler<HTMLElement>
    onMouseLeave?: React.MouseEventHandler<HTMLElement>
}

export default class Popup extends React.Component<_PopupProps, PopupState> {
    private ref = React.createRef<HTMLDivElement>()
    private alignRef = React.createRef<Align>()
    private handleResize: () => void

    constructor(props: _PopupProps) {
        super(props)

        this.state = {
            //for popup arrow(tooltip, popover)
            arrowPos: {
                left: 0,
                top: 0
            },
            left: 0,
            top: 0,
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

        this.setState({
            arrowPos: getArrowPosition(target, child, placement!)
        })
    }

    afterAlign(left: number, top: number) {
        () => {
            const {
                leftOffset,
                topOffset
            } = this.alignRef.current!.adjustElement()

            if (leftOffset !== 0 || topOffset !== 0) {
                this.setState(
                    {
                        left: left + leftOffset,
                        top: top + topOffset
                    },
                    this.handleArrowPosition
                )
            } else {
                this.handleArrowPosition()
            }
        }
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
            () => this.afterAlign(left, top)
        )
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
                onMouseEnter,
                onMouseLeave
            },
            state: {
                left = 0,
                top = 0,
                arrowPos,
                placement,
                exited
            }
        } = this

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
                <PopupInner
                    elRef={elRef}
                    placement={placement}
                    arrowPos={arrowPos}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}>
                    {children}
                </PopupInner>
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
                transitionProps: tProps = {} as TransitionProps
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
            ...tProps,
            onEnter: chainFunction(this.handleEnter, tProps.onEnter || noop),
            onEntering: chainFunction(this.handleEntering, tProps.onEntering || noop),
            onEntered: chainFunction(this.handleEntered, tProps.onEntered || noop),
            onExit: chainFunction(this.handleExit, tProps.onExit || noop),
            onExited: chainFunction(this.handleExited, tProps.onExited || noop),
            in: !!visible
        }
        const element: any = transition ? transition : NoTransition
        const c = React.createElement(element, newTransitionProps, align)

        return popupMountNode === null ? c : (
            <Portal
                mountNode={popupMountNode}
                visible={visible || !exited}
                forceRender={forceRender}>
                {c}
            </Portal>
        )
    }
}