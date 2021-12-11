import * as React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {omit} from "reap-utils/lib";
import {Transition} from "reap-utils/lib/react";
import {ValueOf} from "../Commons/common-types";
import Toast, {ToastProps} from "../Toast";

const placements = [
    "topRight",
    "bottomRight",
    "bottomLeft",
    "topLeft"
] as const

type Placement = ValueOf<typeof placements>

export interface Options extends ToastProps {
    placement?: Placement
}

const placementClassMap = new Map<Placement, string[]>([
    ["topRight", ["top-0", "end-0"]],
    ["bottomRight", ["bottom-0", "end-0"]],
    ["bottomLeft", ["bottom-0", "start-0"]],
    ["topLeft", ["top-0", "start-0"]]
])
const placementContainerMap = new Map<Placement, HTMLElement | null>([
    ["topRight", null],
    ["bottomRight", null],
    ["bottomLeft", null],
    ["topLeft", null]
])

export default class Notification {
    container: HTMLElement | null = null
    placement: Placement | undefined
    msg: React.ReactNode = null
    props: ToastProps = {}
    visible = false

    open(
        msg: React.ReactNode,
        {
            unmountOnExit = true,
            placement = "bottomRight",
            ...restProps
        }: Options = {}
    ) {
        const className = placementClassMap.get(placement)
        let container = placementContainerMap.get(placement)

        if (!className) {
            return
        }

        if (!container) {
            container = document.createElement("div")
            container.style.overflow = "hidden"

            container.classList.add("position-fixed", ...className)
            document.body.appendChild(container)

            placementContainerMap.set(placement, container)
        }

        if (!this.container) {
            this.container = document.createElement("div")

            container.appendChild(this.container)
        }

        this.placement = placement
        this.msg = msg
        this.props = omit(restProps, "onClose")

        this.renderToast(true)

        return this
    }

    close = () => {
        if (this.visible) {
            this.renderToast(false)
        }
    }

    destroy = () => {
        if (!this.container || !this.placement) {
            return
        }

        const container = placementContainerMap.get(this.placement)

        if (container) {
            unmountComponentAtNode(this.container)
            container.removeChild(this.container)

            this.container = null
            this.placement = undefined
        }
    }

    renderToast(visible: boolean) {
        const {
            placement,
            container,
            props
        } = this

        if (!container) {
            return
        }

        this.visible = visible

        render(
            <Transition
                in={visible}
                unmountOnExit
                appear
                onExited={this.destroy}>
                {
                    status => {
                        const left = /left/i.test(placement!)
                        const right = /right/i.test(placement!)
                        const {
                            style = {},
                            ...restProps
                        } = props
                        style.transition = "transform .15s"

                        if (left) {
                            style.transform = "translateX(-110%)"
                        } else if (right) {
                            style.transform = "translateX(110%)"
                        }

                        if (status === "entering" || status === "entered") {
                            style.transform = "none"
                        }

                        return (
                            <Toast
                                className="m-3"
                                visible={visible}
                                fade={false}
                                style={style}
                                hideOnExit={false}
                                onClose={this.close}
                                {...restProps}>
                                {this.msg}
                            </Toast>
                        )
                    }
                }
            </Transition>,
            this.container
        )
    }
}