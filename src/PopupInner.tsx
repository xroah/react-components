import * as React from "react"
import {createPortal} from "react-dom";
import {noop} from "reap-utils/lib";
import {Fade, mergeRef} from "reap-utils/lib/react";
import Alignment from "./Alignment";
import {InnerProps, InnerState} from "./types";
import {getContainer} from "./utils";

export default class PopupInner extends
    React.Component<InnerProps, InnerState> {
    containerRef = React.createRef<HTMLDivElement>()
    innerRef = React.createRef<HTMLDivElement>()
    alignRef = React.createRef<Alignment>()
    portalContainer = document.createElement("div")

    listenerAdded = false
    rendered = false
    state = {
        left: 0,
        top: 0
    }

    componentDidUpdate(prevProps: InnerProps) {
        const {
            animation,
            visible
        } = this.props

        // currently visible
        if (prevProps.visible !== visible && visible && !animation) {
            this.align()
        }

        if (visible) {
            this.addListener()
        } else {
            this.rmListener()
        }
    }

    componentWillUnmount() {
        const parent = this.portalContainer.parentNode

        if (parent) {
            parent.removeChild(this.portalContainer)
        }

        this.rmListener()
    }

    addListener() {
        if (this.listenerAdded) {
            return
        }

        const {
            autoClose,
            escClose
        } = this.props
        this.listenerAdded = true

        if (autoClose) {
            document.addEventListener("click", this.handleDocClick)
        }
        if (escClose) {
            document.addEventListener("keydown", this.handleDocKeyDown)
        }
    }

    rmListener() {
        this.listenerAdded = false

        document.removeEventListener("click", this.handleDocClick)
        document.removeEventListener("keydown", this.handleDocKeyDown)
    }

    handleDocClick = (evt: MouseEvent) => {
        const {
            relatedTarget,
            overlay
        } = this.getElements()
        const {onClick} = this.props
        const target = evt.target as HTMLElement

        if (
            !relatedTarget ||
            !overlay ||
            typeof onClick !== "function"
        ) {
            return
        }

        if (target === relatedTarget || relatedTarget.contains(target)) {
            onClick("toggle")
        } else if (target === overlay || overlay.contains(target)) {
            onClick("inside")
        } else {
            onClick("outside")
        }
    }

    handleDocKeyDown = (evt: KeyboardEvent) => {
        const {onEscKeyDown} = this.props

        if (evt.key.toLowerCase() === "escape" && onEscKeyDown) {
            onEscKeyDown()
        }
    }

    align = () => {
        const {current: ref} = this.alignRef

        if (ref) {
            const {left, top} = ref.align()

            this.setState({left, top})
        }
    }

    renderPortal(element: React.ReactElement, container?: HTMLElement) {
        if (container) {
            const parent = this.portalContainer.parentNode
            const target = this.props.getTarget()

            if (target && !container.contains(target)) {
                throw new Error(`
                    The mountNode does not contain the child,
                    please try another
                `)
            }

            if (!parent || parent !== container) {
                container.appendChild(this.portalContainer)
            }

            return createPortal(element, this.portalContainer)
        }

        return null
    }

    getElements = () => ({
        relatedTarget: this.props.getTarget(),
        overlay: this.innerRef.current
    })

    render() {
        const {
            forceRender,
            visible,
            overlayRef = noop,
            children,
            mountNode,
            animation,
            onMouseEnter,
            onMouseLeave,
            ...restProps
        } = this.props
        const {left, top} = this.state
        let display: "none" | undefined

        if (!animation && !visible) {
            display = "none"
        }

        if (!visible && !forceRender && !this.rendered) {
            return null
        }

        const container = getContainer(mountNode)
        const _overlay = (
            <div
                ref={mergeRef(overlayRef, this.innerRef)}
                style={{
                    position: "absolute",
                    display,
                    left: 0,
                    top: 0,
                    willChange: "transform",
                    transform: `translate(${left}px, ${top}px)`
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                {children}
            </div>
        )
        const element = (
            <Alignment
                ref={this.alignRef}
                getElements={this.getElements}
                container={container}
                {...restProps}>
                <div
                    ref={this.containerRef}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: 0
                    }}>
                    {
                        animation ? (
                            <Fade
                                hiddenOnExited
                                appear
                                in={!!visible}
                                onEntering={this.align}>
                                {_overlay}
                            </Fade>
                        ) : _overlay
                    }
                </div>
            </Alignment>
        )
        this.rendered = true

        return (
            mountNode === null ?
                element :
                this.renderPortal(element, container)
        )
    }
}