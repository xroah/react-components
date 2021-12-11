import * as React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {omit} from "reap-utils/lib";
import {Transition} from "reap-utils/lib/react";
import warning from "warning";
import {ValueOf} from "../Commons/common-types";
import Toast, {ToastProps} from "../Toast";

let zIndex = 2000

const placements = [
    "topRight",
    "bottomRight",
    "bottomLeft",
    "topLeft"
] as const

export type Placement = ValueOf<typeof placements>

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
    umountOnExit = true
    zIndex = zIndex++

    constructor(
        msg: React.ReactNode,
        {
            unmountOnExit = true,
            placement = "bottomRight",
            ...restProps
        }: Options = {}
    ) {
        this.msg = msg
        this.umountOnExit = unmountOnExit
        this.placement = placement
        this.props = omit(restProps, "onClose")
    }

    open() {
        const placement = this.placement!
        const valid = placement || placements.indexOf(placement) >= 0

        if (!valid) {
            warning(
                !valid,
                `
                    The placement can be ${placements.join(" or ")},
                    received ${placement}
                `
            )

            return
        }

        const className = placementClassMap.get(placement)
        let container = placementContainerMap.get(placement)

        if (!container) {
            container = document.createElement("div")
            container.style.overflow = "hidden"

            container.classList.add("position-fixed", ...className!)
            document.body.appendChild(container)

            placementContainerMap.set(placement, container)
        }

        if (!this.container) {
            this.container = document.createElement("div")

            container.appendChild(this.container)
        }

        this._renderToast(true)

        return this
    }

    close = () => {
        if (this.visible) {
            this._renderToast(false)
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

    private _renderToast(visible: boolean) {
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
                        style.transition = "transform .3s"
                        style.zIndex = this.zIndex

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