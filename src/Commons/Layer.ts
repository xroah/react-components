import * as React from "react"
import {unmountComponentAtNode} from "react-dom"
import {omit} from "reap-utils/lib"
import {ClosableProps, Events} from "./common-types"

export default class Layer<P extends Events & ClosableProps> {
    visible = false
    container: HTMLElement
    static parent: HTMLElement | null = null

    constructor(
        protected msg: React.ReactNode = null,
        protected props: P
    ) {
        this.msg = msg
        this.props = props
        this.container = document.createElement("div")
        console.log(this)
    }

    static createParent() {
        if (this.parent) {
            return this.parent
        }

        const parent = this.parent = document.createElement("div")

        document.body.appendChild(parent)

        return parent
    }

    mount(
        parent: HTMLElement,
        container: HTMLElement,
        prepend = false
    ) {
        if (container.parentNode) {
            return
        }

        if (prepend) {
            // @ts-ignore
            if (parent.prepend) {
                parent.prepend(container)

                return
            } else {
                const first = parent.firstElementChild

                if (first) {
                    parent.insertBefore(container, first)

                    return
                }
            }
        }

        parent.appendChild(container)
    }

    open() {
        if (!this.visible) {
            this.render(true)
        }

        return this
    }

    close = () => {
        if (this.visible) {
            this.render(false)
        }
    }

    static destroy(container: HTMLElement | null) {
        const parent = container?.parentElement

        if (!container || !parent) {
            return false
        }

        unmountComponentAtNode(container)
        parent.removeChild(container)

        if (!parent.childElementCount) {
            document.body.removeChild(parent)

            this.parent = null

            return true
        }

        return false
    }

    onExited = () => {
        Layer.destroy(this.container)
    }

    onHidden = () => {
        this.onExited()
        this.props.onHidden?.()
    }

    getProps(props: P = this.props) {
        return omit(props, ["onClose", "onHidden"])
    }

    protected render(visible: boolean) {
        this.visible = visible
    }
}