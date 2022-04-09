import * as React from "react"
import {
    Fade,
    NoTransition,
    only
} from "reap-utils/lib/react"
import {Events} from "../Commons/common-types"
import {
    computePosition,
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
}

export interface OverlayProps extends OverlayCommonProps {
    auto?: boolean
    targetRef?: React.RefObject<HTMLElement>
    unmountOnExit?: boolean
}

interface State {
    style?: React.CSSProperties
}

class Overlay extends React.Component<OverlayProps, State> {
    private _ref = React.createRef<HTMLDivElement>()
    private _parent: HTMLElement | null = null

    static defaultProps = {
        fade: true,
        auto: true,
        placement: "bottom"
    }

    constructor(props: OverlayProps) {
        super(props)

        this.state = {
            style: {
            }
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

        if (
            !targetRef ||
            !targetRef.current ||
            !_ref ||
            !_ref.current
        ) {
            return Promise.resolve({x: 0, y: 0})
        }

        const middleware: Middleware[] = [
            flip(),
            shift(),
            offsetMiddleware(handleOffset(offset, placement))
        ]

        if (arrow && arrow.current) {
            middleware.push(
                arrowMiddleware({element: arrow.current})
            )
        }

        return computePosition(
            targetRef.current,
            _ref.current,
            {
                placement: (
                    alignment ?
                        `${placement}-${alignment}`
                        : placement
                ) as any,
                middleware
            }
        )
    }

    update = () => {
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
            onShow,
            onShown,
            onHide,
        } = this.props
        const child = only(children)
        const {style} = this.state
        const newChildren = (
            <div
                ref={this._ref}
                tabIndex={-1}
                style={{
                    ...style,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    outline: "none"
                }}>
                {child}
            </div>
        )
        const transitionProps: TransitionProps = {
            in: !!visible,
            onEnter: onShow,
            onEntering: this.update,
            onEntered: onShown,
            onExit: onHide,
            onExited: this.handleExited,
            children: newChildren,
            nodeRef: this._ref,
            appear: true
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