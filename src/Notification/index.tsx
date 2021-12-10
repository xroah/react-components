import * as React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {ValueOf} from "../Commons/common-types";
import Toast, {ToastProps} from "../Toast";

const placements = [
    "topRight",
    "bottomRight",
    "bottomLeft",
    "topLeft"
] as const

type Placement = ValueOf<typeof placements>

interface Options extends ToastProps {
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

        this.renderToast(true, msg, restProps)
    }

    close = () => {
        this.renderToast(false, this.msg)
    }

    destroy = () => {
        if (!this.placement) {
            return
        }

        const container = placementContainerMap.get(this.placement)

        if (!this.container || !container) {
            return
        }

        unmountComponentAtNode(this.container)
        container.removeChild(this.container)

        this.container = null
        this.placement = undefined
    }

    renderToast(
        visible: boolean,
        msg?: React.ReactNode,
        props?: ToastProps
    ) {
        if (!this.container) {
            return
        }

        render(
            <Toast
                className="m-3"
                visible={visible}
                onClose={this.close}
                onHidden={this.destroy}
                {...props}>
                {msg}
            </Toast>,
            this.container
        )
    }
}