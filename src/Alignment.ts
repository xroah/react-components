import * as React from "react"
import {getScrollOffset, reflow} from "reap-utils/lib/dom"
import {CommonProps} from "./types"

interface AlignmentProps extends CommonProps {
    getElements: () => ({
        relatedTarget: null | Element
        overlay: null | Element
    })
    children: React.ReactElement
    container?: HTMLElement
}

export default class Alignment extends React.Component<AlignmentProps> {
    handleOffset() {
        let {offset} = this.props
        let ret = {
            x: 0,
            y: 0
        }

        if (offset) {
            if (typeof offset === "number") {
                offset = {
                    x: offset,
                    y: offset
                }
            }

            ret.x = offset.x || 0
            ret.y = offset.y || 0
        }

        return ret
    }

    vAlign(targetRect: DOMRect, overlayRect: DOMRect) {
        const {alignment, placement} = this.props
        const {x, y} = this.handleOffset()
        let {left, top} = getScrollOffset(this.props.container!)
        left += targetRect.left + x

        if (placement === "top") {
            top += targetRect.top - overlayRect.height - y
        } else {
            top += targetRect.top + targetRect.height + y
        }

        switch (alignment) {
            case "center":
                left += (targetRect.width - overlayRect.width) / 2
                break
            case "end":
                left += (targetRect.width - overlayRect.width)
                break
            default:
            // default start
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