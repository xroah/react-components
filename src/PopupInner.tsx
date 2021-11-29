import * as React from "react"
import {createPortal} from "react-dom";
import {noop} from "reap-utils/lib";
import {Fade, mergeRef} from "reap-utils/lib/react";
import Alignment from "./Alignment";
import {CommonProps} from "./types";

interface InnerProps extends CommonProps {
    getTarget: () => Element | null
}

interface State {
    left: number
    top: number
}

export default class PopupInner extends React.Component<InnerProps, State> {
    containerRef = React.createRef<HTMLDivElement>()
    innerRef = React.createRef<HTMLDivElement>()
    alignRef = React.createRef<Alignment>()

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

        if (prevProps.visible !== visible && visible && !animation) {
            this.align()
        }
    }

    align = () => {
        const {current: ref} = this.alignRef

        if (ref) {
            const {left, top} = ref.align()

            this.setState({left, top})
        }
    }

    getContainer() {
        const {mountNode} = this.props

        if (!mountNode) {
            return
        }

        let container: HTMLElement | undefined

        if (typeof mountNode === "string") {
            container = document.querySelector(mountNode) as HTMLElement
        } else if (mountNode.nodeType) {
            container = mountNode
        }

        return container
    }

    renderPortal(element: React.ReactElement, container?: HTMLElement) {
        if (container) {
            return createPortal(element, container)
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

        const container = this.getContainer()
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
                }}>
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