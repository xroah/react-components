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

    mount(prepend = false) {
        if (!this.container) {
            this.container = document.createElement("div")

            if (this.parent) {
                if (prepend) {
                    // @ts-ignore
                    if (this.parent.prepend) {
                        return this.parent.prepend(this.container)
                    } else {
                        const first = this.parent.firstElementChild

                        if (first) {
                            return this.parent.insertBefore(
                                this.container,
                                first
                            )
                        }
                    }
                }

                this.parent.appendChild(this.container)
            }
        }
    }

    open() {
        this.render(true)

        return this
    }

    close = () => {
        if (this.visible) {
            this.render(false)
        }
    }

    destroy() {
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