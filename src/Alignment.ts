import * as React from "react"
import {getScrollOffset, reflow} from "reap-utils/lib/dom"
import {AlignmentProps} from "./types"
import {getOffset} from "./utils"

export default class Alignment extends React.Component<AlignmentProps> {
    private vAlign(targetRect: DOMRect, overlayRect: DOMRect) {
        const {
            alignment,
            placement,
            container,
            offset
        } = this.props
        const {x, y} = getOffset(offset)
        let {left, top} = getScrollOffset(container!)
        left += targetRect.left + x
        top += targetRect.top

        if (placement === "top") {
            top -= overlayRect.height + y
        } else {
            top += targetRect.height + y
        }

        switch (alignment) {
            case "center":
                left += (targetRect.width - overlayRect.width) / 2
                break
            case "end":
                left += targetRect.width - overlayRect.width
                break
            default:
            // default start
        }

        return {
            left,
            top
        }
    }

    private hAlign(targetRect: DOMRect, overlayRect: DOMRect) {
        const {
            verticalAlign,
            placement,
            container,
            offset
        } = this.props
        const {x, y} = getOffset(offset)
        let {left, top} = getScrollOffset(container!)
        top += targetRect.top + y
        left += targetRect.left

        if (placement === "left") {
            left -= overlayRect.width + x
        } else {
            left += targetRect.width + x
        }

        switch (verticalAlign) {
            case "middle":
                top += (targetRect.height - overlayRect.height) / 2
                break
            case "bottom":
                top += targetRect.height - overlayRect.height
                break
            default:
            // default top  
        }

        return {
            left,
            top
        }
    }

    align() {
        const {
            relatedTarget,
            overlay
        } = this.props.getElements()
        const {placement, container} = this.props
        let left = 0
        let top = 0

        if (!relatedTarget || !overlay || !container) {
            return {
                left,
                top
            }
        }

        reflow(overlay as HTMLElement)

        const targetRect = relatedTarget.getBoundingClientRect()
        const overlayRect = overlay.getBoundingClientRect()

        if (placement === "top" || placement === "bottom") {
            ({left, top} = this.vAlign(targetRect, overlayRect))
        } else {
            ({left, top} = this.hAlign(targetRect, overlayRect))
        }

        return {
            left,
            top
        }
    }

    render() {
        return this.props.children
    }
}