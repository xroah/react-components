import * as React from "react"
import {
    Fade,
    mergeRef,
    NoTransition,
    only
} from "reap-utils/lib/react"
import {DivProps, Events} from "../Commons/common-types"
import {
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset as offsetMiddleware,
    arrow as arrowMiddleware,
    Alignment
} from "@floating-ui/dom"
import {TransitionProps} from "reap-utils/lib/react/transition/interface"
import {Middleware, Side} from "@floating-ui/core"
import {getContainer, handleOffset} from "../Commons/utils"
import {createPortal} from "react-dom"
import {omit, throttle} from "reap-utils"

type BaseProps = Omit<DivProps, "children">

export interface OverlayCommonProps extends Events {
    placement?: Side
    children: React.ReactElement
    container?: string | HTMLElement
    fade?: boolean
    offset?: number | number[]
    arrow?: React.RefObject<HTMLElement>
    alignment?: Alignment
    onClickOutside?: (evt: MouseEvent) => void
    visible?: boolean
    overlayRef?: React.Ref<HTMLElement>
    autoUpdatePosition?: boolean
}

export interface OverlayProps extends OverlayCommonProps, BaseProps {
    targetRef: React.RefObject<HTMLElement>
    auto?: boolean
    unmountOnExit?: boolean
}

interface State {
    style?: React.CSSProperties
}

class Overlay extends React.Component<OverlayProps, State> {
    private _ref = React.createRef<HTMLDivElement>()
    private _parent: HTMLElement | null = null
    private _cleanupAutoUpdate: Function | null = null

    static defaultProps = {
        fade: true,
        auto: true,
        autoUpdatePosition: true,
        placement: "bottom",
    }

    constructor(props: OverlayProps) {
        super(props)

        this.state = {
            style: {}
        }
    }

    componentDidUpdate({visible: prevVisible}: OverlayProps) {
        const {visible} = this.props

        if (visible !== prevVisible) {
            if (visible) {
                this.addDocListener()
            } else {
                this.cleanupAutoUpdate()
                this.removeDocListener()
            }
        }
    }

    addDocListener() {
        document.addEventListener(
            "click",
            this.handleDocClick
        )
    }

    removeDocListener() {
        document.removeEventListener(
            "click",
            this.handleDocClick
        )
    }

    handleDocClick = (evt: MouseEvent) => {
        const {target} = evt
        const {current: el} = this._ref

        if (!el) {
            return
        }

        if (
            el !== target &&
            !el.contains(target as HTMLElement)
        ) {
            this.props.onClickOutside?.(evt)
        }
    }

    compute() {
        const {
            targetRef,
            arrow,
            offset = 0,
            placement,
            alignment
        } = this.props
        const {_ref} = this

        if (!targetRef.current || !_ref.current) {
            return Promise.resolve({x: 0, y: 0})
        }

        const middleware: Middleware[] = [
            flip(),
            shift(),
            offsetMiddleware(handleOffset(offset, placement))
        ]

        if (arrow && arrow.current) {
            middleware.push(arrowMiddleware({element: arrow.current}))
        }

        return computePosition(
            targetRef.current,
            _ref.current,
            {
                placement: (
                    alignment ? `${placement}-${alignment}` : placement
                ) as any,
                middleware
            }
        )
    }

    autoUpdate = () => {
        const {autoUpdatePosition, targetRef} = this.props

        if (
            autoUpdatePosition &&
            targetRef.current &&
            this._ref.current
        ) {
            this._cleanupAutoUpdate = autoUpdate(
                targetRef.current,
                this._ref.current,
                throttle(this.update, 200)
            )
        }
    }

    cleanupAutoUpdate() {
        if (this._cleanupAutoUpdate) {
            this._cleanupAutoUpdate()

            this._cleanupAutoUpdate = null
        }
    }

    update = () => {
        if (!this.props.visible) {
            return
        }

        this.compute().then(({x, y}) => {
            this.setState({
                style: {
                    transform: `translate3d(${x}px, ${y}px, 0)`
                }
            })
        })
    }

    handleExited = (node?: HTMLElement) => {
        const {_parent: p} = this

        if (this.props.unmountOnExit && p) {
            p.parentNode?.removeChild(p)
        }

        this.props.onHidden?.(node)
    }

    renderChildren(child: React.ReactElement) {
        const container = getContainer(this.props.container)

        if (container) {
            if (!this._parent) {
                this._parent = document.createElement("div")

                container.appendChild(this._parent)
            }

            return createPortal(child, this._parent)
        }

        return child
    }

    render() {
        const {
            children,
            visible,
            auto,
            fade,
            overlayRef,
            onShow,
            onShown,
            onHide,
            style: propsStyle,
            unmountOnExit,
            ...restProps
        } = this.props
        const child = only(children)
        const {style} = this.state
        const ref = overlayRef ?
            mergeRef(this._ref, overlayRef) : this._ref

        omit(
            restProps,
            [
                "onHidden",
                "arrow",
                "placement",
                "container",
                "offset",
                "alignment",
                "onClickOutside",
                "targetRef",
                "autoUpdatePosition"
            ]
        )

        const newChildren = (
            <div
                ref={ref}
                tabIndex={-1}
                style={{
                    ...propsStyle,
                    ...style,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    outline: "none"
                }}
                {...restProps}>
                {child}
            </div>
        )
        const transitionProps: TransitionProps = {
            in: !!visible,
            onEnter: onShow,
            onEntering: this.autoUpdate,
            onEntered: onShown,
            onExit: onHide,
            onExited: this.handleExited,
            children: newChildren,
            nodeRef: this._ref,
            appear: true,
            unmountOnExit
        }
        let c: React.ReactElement = child

        if (auto) {
            c = (
                <>
                    {
                        fade ?
                            <Fade {...transitionProps} /> :
                            <NoTransition {...transitionProps} />
                    }
                </>
            )
        }

        return this.renderChildren(c)
    }
}

export default Overlay