import * as React from "react"
import {render} from "react-dom"
import Info from "../Commons/Layer"
import MessageItem, {MessageItemProps} from "./Item"

export default class Message extends Info<MessageItemProps> {
    open() {
        if (this.visible) {
            return this
        }

        this.createParent(
            true,
            el => el.style.cssText = `
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

        )

        return super.open()
    }

    render(visible: boolean) {
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