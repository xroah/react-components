import * as React from "react"
import {
    Fade,
    NoTransition,
    only
} from "reap-utils/lib/react"
import {Placement, Trigger} from "../Commons/common-types"
import {
    computePosition,
    flip,
    shift,
    offset,
    arrow
} from "@floating-ui/dom"
import {TransitionProps} from "reap-utils/lib/react/transition/interface"

interface PopupProps {
    nodeRef?: React.RefObject<HTMLElement>
    placement?: Placement
    trigger?: Trigger
    visible?: boolean
    children: React.ReactElement
    container?: string | HTMLElement | Node
    targetRef?: React.RefObject<HTMLElement>
    auto?: boolean
    fade?: boolean
    offset?: number | number[]
    arrow?: HTMLElement
    unmountOnExit?: boolean
}

interface State {
    style?: React.CSSProperties
}

class Popup extends React.Component<PopupProps, State> {
    ref = React.createRef<HTMLDivElement>()

    static defaultProps = {
        fade: true,
        auto: true,
        placement: "bottom"
    }

    constructor(props: PopupProps) {
        super(props)

        this.state = {
            style: {}
        }
    }

    compute(node?: HTMLElement) {
        const {targetRef} = this.props

        if (
            !targetRef ||
            !targetRef.current ||
            !node
        ) {
            return Promise.resolve({x: 0, y: 0})
        }

        return computePosition(
            targetRef.current,
            node,
            {
                placement: this.props.placement as any,
                middleware: [
                    flip(),
                    shift(),
                    offset(this.handleOffset())
                ]
            }
        )
    }
    
    handleOffset() {
        let {offset = 0, placement} = this.props
        const isH = placement === "left" || placement === "right"

        if (!Array.isArray(offset)) {
            offset = [offset, offset]
        }

        return {
            mainAxis: isH ? offset[0] : offset[1],
            crossAxis: isH ? offset[1] : offset[0]
        }
    }

    handleEntering = (node?: HTMLElement) => {
        this.compute(node).then(({x, y}) => {
            this.setState({
                style: {
                    transform: `translate3d(${x}px, ${y}px, 0)`
                }
            })
        })
    }

    render() {
        const {
            nodeRef,
            children,
            visible,
            auto,
            unmountOnExit,
            fade,
        } = this.props
        const child = only(children)
        const {style: stateStyle} = this.state
        const transitionProps: TransitionProps = {
            in: !!visible,
            onEntering: this.handleEntering,
            children: React.cloneElement(
                child,
                {
                    style: {
                        ...child.props.style,
                        ...stateStyle
                    }
                }),
            nodeRef,
            unmountOnExit
        }

        if (auto) {
            return (
                <>
                    {
                        fade ?
                            <Fade {...transitionProps} /> :
                            <NoTransition {...transitionProps} />
                    }
                </>
            )
        }

        return child
    }
}

export default Popup