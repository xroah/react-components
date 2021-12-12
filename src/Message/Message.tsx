import * as React from "react"
import {render} from "react-dom"
import Info from "../Commons/Info"
import MessageItem, {MessageItemProps} from "./Item"

let container: HTMLElement | null = null

export default class Message extends Info<MessageItemProps> {
    open() {
        if (this.visible) {
            return this
        }

        if (!container) {
            container = this.createParent(
                el => {
                    el.style.cssText = `
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
                }
            )
        }

        this.mount()

        return super.open()
    }

    destroy(): undefined {
        if (!container) {
            return
        }

        if (super.destroy()) {
            container = null
        }
    }

    render(visible: boolean) {
        if (!this.container) {
            return
        }

        super.render(visible)
        render(
            <MessageItem
                visible={visible}
                onClose={this.close}
                // @ts-ignore
                onHidden={this.handleExited}
                {...this.getProps()}>
                {this.msg}
            </MessageItem>,
            this.container
        )
    }
}