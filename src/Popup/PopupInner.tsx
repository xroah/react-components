import * as React from "react"
import {createPortal} from "react-dom";
import {noop} from "reap-utils/lib";
import {
    Fade,
    handleFuncProp,
    mergeRef
} from "reap-utils/lib/react";
import Alignment from "./Alignment";
import {InnerProps, InnerState} from "./types";
import {getContainer} from "./utils";

export default class PopupInner extends
    React.Component<InnerProps, InnerState> {
    private innerRef = React.createRef<HTMLDivElement>()
    private alignRef = React.createRef<Alignment>()
    private portalContainer = document.createElement("div")

    private listenerAdded = false
    private rendered = false
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

    private addListener() {
        if (this.listenerAdded) {
            return
        }

        const {
            autoClose,
            escClose
        } = this.props
        this.listenerAdded = true

        if (autoClose) {
            if (escClose) {
                document.addEventListener("keydown", this.handleDocKeyDown)
            }

            document.addEventListener("click", this.handleDocClick)
        }
    }

    private rmListener() {
        this.listenerAdded = false

        document.removeEventListener("click", this.handleDocClick)
        document.removeEventListener("keydown", this.handleDocKeyDown)
    }

    private handleDocClick = (evt: MouseEvent) => {
        const {
            relatedTarget,
            overlay
        } = this.getElements()
        const {onClose} = this.props
        const target = evt.target as HTMLElement

        if (!relatedTarget || !overlay || !onClose) {
            return
        }

        if (target === relatedTarget || relatedTarget.contains(target)) {
            onClose("toggle")
        } else if (target === overlay || overlay.contains(target)) {
            onClose("inside")
        } else {
            onClose("outside")
        }
    }

    private handleDocKeyDown = (evt: KeyboardEvent) => {
        const {onClose} = this.props

        if (evt.key.toLowerCase() === "escape" && onClose) {
            onClose("esc")
        }
    }

    align = () => {
        const {current: ref} = this.alignRef

        if (ref) {
            const {
                needFlip,
                boundary,
                ...ret
            } = ref.align()

            this.setState(
                {
                    left: ret.left,
                    top: ret.top
                },
                () => {
                    const onAlign = handleFuncProp(this.props.onAlign)

                    if (
                        needFlip !== undefined && (
                            // original placement has enough space 
                            !needFlip ||
                            // flipped
                            ret.placement !== ret.newPlacement
                        )
                    ) {
                        const newPos = ref.adjust(
                            boundary!,
                            ret.newPlacement!,
                            ret.left,
                            ret.top
                        )

                        this.setState(
                            newPos,
                            () => onAlign({
                                ...ret,
                                ...newPos
                            })
                        )
                    } else {
                        onAlign(ret)
                    }
                }
            )
        }
    }

    private renderPortal(
        element: React.ReactElement,
        container?: HTMLElement | null
    ) {
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

    private getElements = () => ({
        relatedTarget: this.props.getTarget(),
        overlay: this.innerRef.current
    })

    private getContainer = () => {
        const {mountNode, getTarget} = this.props

        if (mountNode === null) {
            const target = getTarget()

            if (target) {
                return target.parentElement
            }

            return null
        }

        return getContainer(mountNode)
    }

    render() {
        const {
            forceRender,
            visible,
            overlayRef = noop,
            children,
            mountNode,
            animation,
            onShown,
            onHidden,
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
                getContainer={this.getContainer}
                {...restProps}>
                <div
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
                                onEntering={this.align}
                                onEntered={onShown}
                                onExited={onHidden}>
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
                this.renderPortal(element, getContainer(mountNode))
        )
    }
}