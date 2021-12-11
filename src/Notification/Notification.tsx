import * as React from "react";
import {render} from "react-dom";
import {Transition} from "reap-utils/lib/react";
import warning from "warning";
import {ValueOf} from "../Commons/common-types";
import Info from "../Commons/Info";
import Toast, {ToastProps} from "../Toast";

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
const placementContainerMap = new Map<Placement, HTMLElement | null>([])

export default class Notification extends Info<Options> {
    placement: Placement | null = null

    constructor(
        msg: React.ReactNode,
        {
            placement = "bottomRight",
            ...restProps
        }: Options = {}
    ) {
        super(msg, restProps)

        this.placement = placement
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

            return this
        }

        const className = placementClassMap.get(placement)
        let container = placementContainerMap.get(placement)

        if (!container) {
            container = document.createElement("div")

            container.classList.add("position-fixed", ...className!)
            document.body.appendChild(container)

            placementContainerMap.set(placement, container)
        }

        this.parent = container

        // prepend if placement is bottom
        this.mount(/bottom/i.test(placement))

        return super.open()
    }

    destroy(): undefined {
        if (!this.placement) {
            return
        }

        if (super.destroy()) {
            placementContainerMap.set(this.placement, null)
        }

        this.placement = null
    }

    render(visible: boolean) {
        const {
            placement,
            container,
            props: {
                style,
                onShow,
                onShown,
                onHide,
                onHidden,
                onClose,
                ...restProps
            }
        } = this

        if (!container) {
            return
        }

        super.render(visible)
        render(
            <Transition
                in={visible}
                unmountOnExit
                appear
                onEnter={onShow}
                onEntered={onShown}
                onExit={onHide}
                onExited={this.handleExited}>
                {
                    status => {
                        const newStyle = {
                            margin: "1rem",
                            ...style,
                            transition: `
                                transform .3s,
                                margin .3s,
                                opacity .3s
                            `,
                            zIndex: 2000
                        }

                        if (
                            status === "entering" ||
                            status === "entered"
                        ) {
                            newStyle.transform = "none"
                        } else if (status === "enter") {
                            const isLeft = /left/i.test(placement!)
                            newStyle.transform = `
                                translateX(${isLeft ? "-" : ""}110%)
                            `
                        } else if (
                            status === "exit" ||
                            status === "exiting"
                        ) {
                            const DIS = "-5rem"

                            if (/top/i.test(placement!)) {
                                newStyle.marginTop = DIS
                            } else {
                                newStyle.marginBottom = DIS
                            }
                            newStyle.opacity = 0
                        }

                        return (
                            <Toast
                                __noAnim__
                                visible={visible}
                                fade={false}
                                style={newStyle}
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