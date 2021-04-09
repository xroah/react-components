import * as React from "react"
import handleFuncProp from "reap-utils/lib/react/handle-func-prop"
import throttle from "reap-utils/lib/throttle"
import chainFunction from "reap-utils/lib/chain-function"
import NoTransition from "reap-transition/lib/NoTransition"
import Align from "./Align"
import Portal from "reap-utils/lib/react/Portal"
import {
    PopupProps,
    PopupState
} from "./interface"
import PopupInner from "./PopupInner"

let popupZIndex = 2000
export default class Popup extends React.Component<PopupProps, PopupState> {
    private ref = React.createRef<HTMLDivElement>()
    private alignRef = React.createRef<Align>()
    private handleResize: () => void

    constructor(props: PopupProps) {
        super(props)

        this.state = {
            left: 0,
            top: 0,
            exited: true,
            zIndex: popupZIndex,
            placement: props.placement!
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

    handleClickOutside = (evt: MouseEvent) => {
        const t = evt.target as HTMLElement
        const parent = this.ref.current
        const target = this.props.target!

        if (
            parent &&
            t !== parent &&
            !parent.contains(t) &&
            t !== target &&
            !target.contains(t)
        ) {
            handleFuncProp(this.props.onClickOutside)(evt)
        }
    }

    afterAlign = () => {
        const {
            leftOffset,
            topOffset
        } = this.alignRef.current!.adjustElement()
        const {
            left,
            top,
            placement
        } = this.state

        if (leftOffset !== 0 || topOffset !== 0) {
            this.setState({
                left: left + leftOffset,
                top: top + topOffset
            })
        }

        handleFuncProp(this.props.onAlign)(placement, this.props.target)
    }

    updatePosition = () => {
        const alignRef = this.alignRef.current

        if (alignRef) {
            this.setState(
                {...alignRef.align()},
                this.afterAlign
            )
        }
    }

    _handleResize = () => {
        this.updatePosition()
    }

    addEvent() {
        document.addEventListener("click", this.handleClickOutside)
        window.addEventListener("resize", this.handleResize)
    }

    removeEvent() {
        document.removeEventListener("click", this.handleClickOutside)
        window.removeEventListener("resize", this.handleResize)
    }

    handleEnter = (node: HTMLElement) => {
        this.setState(
            {
                exited: false,
                zIndex: popupZIndex++
            },
            //update position, in case calc incorrectly(display: none)
            //exited: false, display: "none" will be removed
            this.updatePosition
        )
        handleFuncProp(this.props.onShow)(node)
    }

    handleEntered = (node: HTMLElement) => {
        handleFuncProp(this.props.onShown)(node)
    }

    handleExit = (node: HTMLElement) => {
        handleFuncProp(this.props.onHide)(node)
    }

    handleExited = (node: HTMLElement) => {
        this.setState({exited: true})
        handleFuncProp(this.props.onHidden)(node)
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
                transitionProps: tProps = {} as any,
                elRef = null,
                ...otherProps
            },
            state: {
                left = 0,
                top = 0,
                placement, //real placement, may flip
                exited,
                zIndex
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
                <PopupInner
                    elRef={elRef}
                    placement={placement}
                    style={{
                        display: exited ? "none" : "",
                        left,
                        top,
                        zIndex
                    }}
                    ref={this.ref}
                    {...otherProps} />
            </Align>
        )
        const transitionProps: any = {
            appear: true,
            ...tProps,
            onEnter: chainFunction(this.handleEnter, tProps.onEnter),
            onEntered: chainFunction(this.handleEntered, tProps.onEntered),
            onExit: chainFunction(this.handleExit, tProps.onExit),
            onExited: chainFunction(this.handleExited, tProps.onExited),
            in: !!visible
        }
        const element: any = transition ? transition : NoTransition
        const c = React.createElement(element, transitionProps, align)

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