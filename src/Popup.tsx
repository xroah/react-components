import * as React from "react"
import {
    getNextNodeByRef,
    only,
    Placeholder,
    Portal
} from "reap-utils/lib/react"
import {isUndef} from "reap-utils/lib"
import {ValueOf} from "./types"
import {actions, placements} from "./constants"

type Trigger = ValueOf<typeof actions>

interface PopupProps {
    placement?: ValueOf<typeof placements>
    children: React.ReactElement
    overlay?: React.ReactNode
    trigger?: Trigger | Trigger[]
    visible?: boolean
    forceRender?: boolean
}

interface State {
    visible: boolean
    x: number
    y: number
    mountNode: null | HTMLElement
}

export default class Popup extends React.Component<PopupProps, State> {
    containerRef = React.createRef<HTMLDivElement>()
    overlayRef = React.createRef<HTMLDivElement>()
    placeholderRef = React.createRef<HTMLDivElement>()

    overlayRendered = false

    constructor(props: PopupProps) {
        super(props)

        this.state = {
            visible: false,
            x: 0,
            y: 0,
            mountNode: null
        }
    }

    static getDerivedStateFromProps(nextProps: PopupProps, nextState: State) {
        if ("visible" in nextProps) {
            nextState.visible = !!nextProps.visible
        }

        return nextState
    }

    handleClick = (evt: React.MouseEvent<HTMLElement>) => {
        const child = this.props.children as React.ReactElement

        if (typeof child.props.onClick === "function") {
            child.props.onClick(evt)
        }

        this.setState(
            {
                visible: !this.state.visible
            },
            () => this.updatePosition()
        )
    }

    updatePosition() {
        const {current: overlay} = this.overlayRef

        if (!overlay || !this.state.visible) {
            return
        }

        let el = getNextNodeByRef(this.placeholderRef)

        if (!el) {
            return
        }

        console.log(el)
        console.log(overlay, overlay.offsetHeight, overlay.offsetWidth)
    }

    renderOverlay() {
        const {
            props: {
                overlay,
                forceRender
            },
            state: {
                visible
            }
        } = this

        if (!overlay) {
            return null
        }

        if (!visible && !forceRender && !this.overlayRendered) {
            return null
        }

        this.overlayRendered = true

        return (
            <div
                ref={this.containerRef}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: 0
                }}>
                <div
                    ref={this.overlayRef}
                    style={{
                        display: visible ? undefined : "none",
                        position: "absolute",
                        left: 0,
                        top: 0
                    }}>
                    {overlay}
                </div>
            </div>
        )
    }

    render() {
        const {
            children,
            overlay,
            forceRender
        } = this.props
        const child = only(children)

        if (isUndef(overlay)) {
            return child
        }

        return (
            <>
                <Portal
                    visible={this.state.visible}
                    forceRender={forceRender}>
                    {this.renderOverlay()}
                </Portal>
                <Placeholder ref={this.placeholderRef} />
                {
                    React.cloneElement(
                        child,
                        {
                            onClick: this.handleClick
                        }
                    )
                }
            </>
        )
    }
}