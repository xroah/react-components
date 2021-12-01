import * as React from "react"
import {
    getScrollOffset,
    getScrollParent,
    reflow
} from "reap-utils/lib/dom"
import {AlignmentProps, Placement, } from "./types"
import {getOffset} from "./utils"

export default class Alignment extends React.Component<AlignmentProps> {
    /**
     * 
     * @param tRect target dom rect
     * @param oRect overlay dom rect
     * @returns spare space
     */
    private getSpareSpace(tRect: DOMRect, oRect: DOMRect) {
        let c = this.props.container!
        let cRect = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: window.innerWidth,
            height: window.innerHeight
        }
        const {x, y} = getOffset()

        if (c !== document.body) {
            const scrollContainer = getScrollParent(c)

            // the specified container in scroll container
            if (scrollContainer !== c && scrollContainer.contains(c)) {
                const rect = scrollContainer.getBoundingClientRect()

                cRect = {...rect}
            }
        }

        return {
            top: tRect.top - oRect.height - cRect.top - y,
            right: cRect.width - oRect.width - tRect.right - x,
            bottom: cRect.height - tRect.bottom - oRect.height - y,
            left: tRect.left - oRect.width - x
        }
    }

    private vAlign(
        tRect: DOMRect,
        oRect: DOMRect,
        placement: Placement
    ) {
        const {
            alignment,
            container,
            offset
        } = this.props
        const {x, y} = getOffset(offset)
        let {left, top} = getScrollOffset(container!)
        left += tRect.left + x
        top += tRect.top

        if (placement === "top") {
            top -= oRect.height + y
        } else {
            top += tRect.height + y
        }

        switch (alignment) {
            case "center":
                left += (tRect.width - oRect.width) / 2
                break
            case "end":
                left += tRect.width - oRect.width
                break
            default:
            // default start
        }

        return {
            left,
            top
        }
    }

    private hAlign(
        tRect: DOMRect,
        oRect: DOMRect,
        placement: Placement
    ) {
        const {
            verticalAlign,
            container,
            offset
        } = this.props
        const {x, y} = getOffset(offset)
        let {left, top} = getScrollOffset(container!)
        top += tRect.top + y
        left += tRect.left

        if (placement === "left") {
            left -= oRect.width + x
        } else {
            left += tRect.width + x
        }

        switch (verticalAlign) {
            case "middle":
                top += (tRect.height - oRect.height) / 2
                break
            case "bottom":
                top += tRect.height - oRect.height
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
            placement,
            container,
            fallbackPlacements: fallback,
            flip,
            getElements,
        } = this.props
        const {
            relatedTarget,
            overlay
        } = getElements()
        let newPlacement = placement
        let ret = {
            left: 0,
            top: 0
        }

        if (
            !relatedTarget ||
            !overlay ||
            !container ||
            !newPlacement
        ) {
            return {
                ...ret,
                placement
            }
        }

        reflow(overlay as HTMLElement)

        const targetRect = relatedTarget.getBoundingClientRect()
        const overlayRect = overlay.getBoundingClientRect()
        const vSet = new Set(["top", "bottom"])
        const hSet = new Set(["left", "right"])
        const spareSpace = this.getSpareSpace(targetRect, overlayRect)

        // no enough space and fallback to other placements
        if (
            flip &&
            spareSpace[newPlacement] < 0 &&
            fallback &&
            fallback.length
        ) {
            for (let f of fallback) {
                if (f !== newPlacement && spareSpace[f] >= 0) {
                    newPlacement = f

                    break
                }
            }
        }

        if (vSet.has(newPlacement)) {
            ret = this.vAlign(targetRect, overlayRect, newPlacement)
        } else if (hSet.has(newPlacement)) {
            ret = this.hAlign(targetRect, overlayRect, newPlacement)
        }

        return {
            ...ret,
            placement,
            newPlacement
        }
    }

    render() {
        return this.props.children
    }
}