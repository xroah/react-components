import * as React from "react"
import {render, unmountComponentAtNode} from "react-dom"
import MessageItem, {MessageItemProps} from "./Item"

let container: HTMLElement | null = null

export default class Message {
    visible = false
    props: MessageItemProps = {}
    msg: React.ReactNode = null
    container: HTMLElement | null = null

    constructor(msg: React.ReactNode, props: MessageItemProps = {}) {
        this.msg = msg
        this.props = props
    }

    open() {
        if (this.visible) {
            return
        }

        if (!container) {
            container = document.createElement("div")
            container.style.cssText = `
                position: fixed;
                left: 0;
                top: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                overflow: hidden;
                width: 100%;
                pointer-events: none;
                z-index: 2000;
            `

            document.body.appendChild(container)
        }

        if (!this.container) {
            this.container = document.createElement("div")

            container.appendChild(this.container)
        }

        this.render(true)
    }

    close = () => {
        if (this.visible) {
            this.render(false)
        }
    }

    destroy = () => {
        if (!this.container || !container) {
            return
        }

        unmountComponentAtNode(this.container)
        container.removeChild(this.container)
        
        if (!container.childElementCount) {
            document.body.removeChild(container)

            container = null
        }

        this.container = null
    }

    private render(visible: boolean) {
        if (!this.container) {
            return
        }

        this.visible = visible

        render(
            <MessageItem
                visible={visible}
                onClose={this.close}
                onHidden={this.destroy}
                {...this.props}>
                {this.msg}
            </MessageItem>,
            this.container
        )
    }
}