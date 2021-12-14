import * as React from "react"
import {unmountComponentAtNode} from "react-dom"
import {chainFunction, omit} from "reap-utils/lib"
import {ClosableProps, Events} from "./common-types"

let parentContainer: HTMLElement | null = null

export default class Layer<P extends Events & ClosableProps> {
    visible = false
    props: P = {} as any
    msg: React.ReactNode = null
    container: HTMLElement | null = null
    parent: HTMLElement | null = null

    constructor(msg: React.ReactNode, props: P = {} as any) {
        this.msg = msg
        this.props = props
    }

    createParent(
        useParent = true,
        cb?: (el: HTMLElement) => void
    ) {
        const parent = document.createElement("div")
        const append = () => document.body.appendChild(parent)

        if (cb) {
            cb(parent)
        }

        if (useParent) {
            if (!parentContainer) {
                parentContainer = parent

                append()
            }

            this.mount(parentContainer)

            return parentContainer
        }

        append()

        return parent
    }

    mount(parent: HTMLElement, prepend = false) {
        if (this.container) {
            return
        }

        this.container = document.createElement("div")
        this.parent = parent

        if (prepend) {
            // @ts-ignore
            if (parent.prepend) {
                parent.prepend(this.container)

                return
            } else {
                const first = parent.firstElementChild

                if (first) {
                    parent.insertBefore(this.container, first)

                    return
                }
            }
        }

        parent.appendChild(this.container)
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

    destroy(): void | true {
        if (!this.container || !this.parent) {
            return
        }

        unmountComponentAtNode(this.container)
        this.parent.removeChild(this.container)

        if (!this.parent.childElementCount) {
            document.body.removeChild(this.parent)

            this.parent = null

            if (this.parent = parentContainer) {
                parentContainer = null
            }

            return true
        }

        this.container = null
    }

    handleExited = () => {
        this.destroy()
    }

    onHidden = chainFunction(
        this.handleExited,
        this.props.onHidden
    )

    getProps(props: P = this.props) {
        return omit(props, ["onClose", "onHidden"])
    }

    protected render(visible: boolean) {
        this.visible = visible
    }
}