import * as React from "react";
import {render} from "react-dom";
import {Transition} from "reap-utils/lib/react";
import warning from "warning";
import {ValueOf} from "../Commons/common-types";
import Info from "../Commons/Info";
import {ToastProps} from "../Toast";
import ToastInner from "../Toast/Inner";

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
    toastRef = React.createRef<HTMLDivElement>()

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
            container = this.createParent(
                el => {
                    className!.push("position-fixed")
                    el.classList.add(...className!)
                }
            )

            placementContainerMap.set(placement, container)
        }

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
                nodeRef={this.toastRef}
                onEnter={onShow}
                onEntered={onShown}
                onExit={onHide}
                onExited={this.handleExited}>
                {
                    status => {
                        const MARGIN = "1rem"
                        const newStyle = {
                            /**
                             * Removing a style property during rerender (marginTop)
                             * when a conflicting property is set (margin)
                             * can lead to styling bugs.
                             * To avoid this, don't mix shorthand and non-shorthand 
                             * properties for the same value; 
                             * instead, replace the shorthand with separate values.
                             */
                            marginTop: MARGIN,
                            marginRight: MARGIN,
                            marginBottom: MARGIN,
                            marginLeft: MARGIN,
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
                            const DIS = "-10rem"

                            if (/top/i.test(placement!)) {
                                newStyle.marginTop = DIS
                            } else {
                                newStyle.marginBottom = DIS
                            }
                            newStyle.opacity = 0
                        }

                        return (
                            <ToastInner
                                visible={visible}
                                nodeRef={this.toastRef}
                                style={newStyle}
                                onClose={this.close}
                                {...restProps}>
                                {this.msg}
                            </ToastInner>
                        )
                    }
                }
            </Transition>,
            this.container
        )
    }
}