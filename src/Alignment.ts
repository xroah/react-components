import * as React from "react"
import {getScrollParent, reflow} from "reap-utils/lib/dom"
import {AlignmentProps, Placement} from "./types"
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

    /**
     * 
     * @param cRect container dom rect
     * @param tRect target dom rect
     * @param oRect  overlay dom rect
     * @param placement real placement
     * @returns left and top
     */
    private vAlign(
        cRect: DOMRect,
        tRect: DOMRect,
        oRect: DOMRect,
        placement: Placement
    ) {
        const {alignment, offset} = this.props
        const {x, y} = getOffset(offset)
        let left = tRect.left - cRect.left + x
        let top = tRect.top - cRect.top

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
        cRect: DOMRect,
        tRect: DOMRect,
        oRect: DOMRect,
        placement: Placement
    ) {
        const {verticalAlign, offset} = this.props
        const {x, y} = getOffset(offset)
        let top = tRect.top - cRect.top + y
        let left = tRect.left - cRect.left

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

        const tRect = relatedTarget.getBoundingClientRect()
        const oRect = overlay.getBoundingClientRect()
        const cRect = container.getBoundingClientRect()
        const boundary = getScrollParent(container)
        const bRect = boundary.getBoundingClientRect()
        const vSet = new Set(["top", "bottom"])
        const hSet = new Set(["left", "right"])
        const spareSpace = this.getSpareSpace(tRect, oRect)

        // no enough space and fallback to other placements
        if (
            flip &&
            spareSpace[newPlacement] < 0 &&
            fallback &&
            fallback.length
        ) {
            for (let f of fallback) {
                if (f !== newPlacement) {
                    if (
                        (hSet.has(f) && bRect.height >= oRect.height) ||
                        (vSet.has(f) && bRect.width >= oRect.width)
                    ) {
                        newPlacement = f

                        break
                    }
                }
            }
        }

        if (vSet.has(newPlacement)) {
            ret = this.vAlign(cRect, tRect, oRect, newPlacement)
        } else if (hSet.has(newPlacement)) {
            ret = this.hAlign(cRect, tRect, oRect, newPlacement)
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