import * as React from "react"
import Layer from "../Commons/Layer"
import MessageItem, {MessageItemProps} from "./Item"


export default class Message extends Layer<MessageItemProps> {
    open() {
        let parent = Message.parent

        if (!parent) {
            parent = Message.createParent()
        }

        parent.style.cssText = `
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

        return super.open(parent)
    }

    render(visible: boolean) {
        const {
            onShow,
            onShown,
            onHide,
            ...restProps
        } = this.props

        super.render(visible)
        this.root.render(
            <MessageItem
                visible={visible}
                onClose={this.close}
                onShow={onShow}
                onShown={onShown}
                onHide={onHide}
                onHidden={this.onHidden}
                {...this.getProps(restProps)}>
                {this.msg}
            </MessageItem>
        )
    }
}