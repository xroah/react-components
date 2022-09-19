import * as React from "react"
import {Root, createRoot} from "react-dom/client"
import {omit} from "reap-utils/lib"
import {ClosableProps, Events} from "./common-types"

export interface RootObject {
    root: Root
    container: HTMLElement
}

export default class Layer<P extends Events & ClosableProps> {
    visible = false
    root: Root
    container: HTMLElement
    rootObject: RootObject

    static parent: HTMLElement | null = null
    static body = document.body

    constructor(
        protected msg: React.ReactNode = null,
        protected props: P
    ) {
        this.msg = msg
        this.props = props
        const container = this.container = document.createElement("div")
        const root = this.root = createRoot(this.container)
        this.rootObject = {
            root,
            container
        }
    }

    static createParent() {
        if (this.parent) {
            return this.parent
        }

        const parent = this.parent = document.createElement("div")

        this.body.appendChild(parent)

        return parent
    }

    static destroy({root, container}: RootObject) {
        const parent = container.parentElement

        if (!parent) {
            return false
        }

        setTimeout(() => root.unmount())
        parent.removeChild(container)

        if (!parent.childElementCount) {
            this.body.removeChild(parent)

            if (parent === this.parent) {
                this.parent = null
            }

            return true
        }

        return false
    }

    mount(parent: HTMLElement, prepend = false) {
        const {container} = this

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

    open(parent?: HTMLElement, prepend?: boolean) {
        if (parent) {
            this.mount(parent, prepend)
        }

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

    onExited = () => {
        (this.constructor as typeof Layer).destroy(this.rootObject)
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