import * as React from "react"
import {unmountComponentAtNode} from "react-dom"
import {omit} from "reap-utils/lib"
import {handleFuncProp} from "reap-utils/lib/react"
import {ClosableProps, Events} from "./common-types"

export default class Info<P extends Events & ClosableProps> {
    visible = false
    props: P
    msg: React.ReactNode = null
    container: HTMLElement | null = null
    parent: HTMLElement | null = null

    constructor(msg: React.ReactNode, props: P = {} as any) {
        this.msg = msg
        this.props = props
    }

    createParent(cb?: (el: HTMLElement) => void) {
        const parent = document.createElement("div")

        if (cb) {
            cb(parent)
        }

        document.body.appendChild(parent)

        return parent
    }

    mount(parent: HTMLElement, prepend = false) {
        if (this.container) {
            return
        }

        this.parent = parent
        this.container = document.createElement("div")

        if (prepend) {
            // @ts-ignore
            if (this.parent.prepend) {
                this.parent.prepend(this.container)

                return
            } else {
                const first = this.parent.firstElementChild

                if (first) {
                    this.parent.insertBefore(this.container, first)

                    return
                }
            }
        }

        this.parent.appendChild(this.container)
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

            return true
        }

        this.container = null
    }

    handleExited = (arg: any) => {
        this.destroy()
        handleFuncProp(this.props.onHidden)(arg)
    }

    getProps() {
        return omit(this.props, ["onClose", "onHidden"])
    }

    protected render(visible: boolean) {
        this.visible = visible
    }
}