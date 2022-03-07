import * as React from "react"
import {render} from "react-dom"
import Layer from "../Commons/Layer"
import MessageItem, {MessageItemProps} from "./Item"


export default class Message extends Layer<MessageItemProps> {
    open() {
        let parent = Message.parent

        if (!parent) {
            parent = Message.createParent()
        }

        const styles = `
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
        parent.style.cssText = styles

        this.mount(parent, this.container)

        return super.open()
    }

    render(visible: boolean) {
        const {
            onShow,
            onShown,
            onHide,
            ...restProps
        } = this.props

        super.render(visible)
        render(
            <MessageItem
                visible={visible}
                onClose={this.close}
                onShow={onShow}
                onShown={onShown}
                onHide={onHide}
                onHidden={this.onHidden}
                {...this.getProps(restProps)}>
                {this.msg}
            </MessageItem>,
            this.container
        )
    }
}