import * as React from "react"
import {
    getScrollOffset,
    getScrollParent,
    reflow
} from "reap-utils/lib/dom"
import {
    AlignmentProps,
    AlignRet,
    Placement
} from "./types"
import {getOffset, getRealBoundary} from "./utils"

export default class Alignment extends React.Component<AlignmentProps> {
    html = document.scrollingElement!

    /**
     * 
     * @param tRect target dom rect
     * @param oRect overlay dom rect
     * @returns spare space
     */
    private getSpareSpace(
        tRect: DOMRect,
        oRect: DOMRect,
        boundary: HTMLElement
    ) {
        const {x, y} = getOffset()
        const ww = this.html.clientWidth
        const wh = this.html.clientHeight
        const ret = {
            left: tRect.left - oRect.width - x,
            top: tRect.top - oRect.height - y,
            right: ww - tRect.right - oRect.width - x,
            bottom: wh - tRect.bottom - oRect.height - y,
            width: ww,
            height: wh
        }

        if (boundary !== this.html) {
            const {
                top,
                right,
                bottom,
                left
            } = getRealBoundary(boundary)

            // top in viewport
            if (top > 0) {
                ret.top -= top
                ret.height -= top
            }

            // bottom in viewport
            if (bottom < wh) {
                ret.bottom -= bottom - tRect.bottom
                ret.height -= wh - bottom
            }

            // left in viewport
            if (left > 0) {
                ret.left -= left
                ret.width -= left
            }

            // right in viewport
            if (right < ww) {
                ret.right -= right - tRect.right
                ret.width -= ww - right
            }
        }

        return ret
    }

    /**
     * 
     * @param tRect target dom rect
     * @param oRect  overlay dom rect
     * @param placement real placement
     * @returns left and top
     */
    private vAlign(
        container: HTMLElement,
        tRect: DOMRect,
        oRect: DOMRect,
        placement: Placement
    ) {
        const {alignment, offset} = this.props
        const {x, y} = getOffset(offset)
        let {left, top} = getScrollOffset(container)
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
        container: HTMLElement,
        tRect: DOMRect,
        oRect: DOMRect,
        placement: Placement
    ) {
        const {verticalAlign, offset} = this.props
        const {x, y} = getOffset(offset)
        let {left, top} = getScrollOffset(container)
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

    adjust(
        boundary: HTMLElement,
        placement: Placement,
        left = 0,
        top = 0
    ) {
        const {overlay} = this.props.getElements()
        const oRect = overlay!.getBoundingClientRect()
        const vSet = new Set(["top", "bottom"])
        const hSet = new Set(["left", "right"])
        const ww = this.html.clientWidth
        const wh = this.html.clientHeight
        let bRect = {
            top: 0,
            right: ww,
            bottom: wh,
            left: 0
        }

        if (boundary !== this.html) {
            bRect = {
                ...getRealBoundary(boundary)
            }
        }

        if (vSet.has(placement)) {
            if (oRect.left < bRect.left) {
                left += Math.abs(oRect.left - bRect.left)
            } else if (oRect.right > bRect.right) {
                left -= Math.abs(oRect.right - bRect.right)
            }
        } else if (hSet.has(placement)) {
            if (oRect.top < bRect.top) {
                top += Math.abs(oRect.top - bRect.top)
            } else if (oRect.bottom > bRect.bottom) {
                top -= Math.abs(oRect.bottom - bRect.bottom)
            }
        }

        return {
            left,
            top
        }
    }

    handleFallback() {
        const {fallbackPlacements} = this.props

        if (!fallbackPlacements) {
            return []
        }

        if (!Array.isArray(fallbackPlacements)) {
            return [fallbackPlacements]
        }

        return fallbackPlacements
    }

    align(): AlignRet {
        const {
            placement,
            getContainer,
            flip,
            getElements,
        } = this.props
        const {
            relatedTarget,
            overlay
        } = getElements()
        const container = getContainer()
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
                placement,
                newPlacement
            }
        }

        reflow(overlay as HTMLElement)

        const tRect = relatedTarget.getBoundingClientRect()
        const oRect = overlay.getBoundingClientRect()
        const boundary = getScrollParent(container)
        const vSet = new Set(["top", "bottom"])
        const hSet = new Set(["left", "right"])
        const space = this.getSpareSpace(tRect, oRect, boundary)
        const needFlip = flip && space[newPlacement] < 0
        const fallbacks = this.handleFallback()
        // no enough space and fallback to other placements
        if (needFlip && fallbacks.length) {
            for (let f of fallbacks) {
                if (f !== newPlacement && space[f] >= 0) {
                    if (
                        (hSet.has(f) && space.height >= oRect.height) ||
                        (vSet.has(f) && space.width >= oRect.width)
                    ) {
                        newPlacement = f

                        break
                    }
                }
            }
        }

        if (vSet.has(newPlacement)) {
            ret = this.vAlign(container, tRect, oRect, newPlacement)
        } else if (hSet.has(newPlacement)) {
            ret = this.hAlign(container, tRect, oRect, newPlacement)
        }

        return {
            ...ret,
            placement,
            newPlacement,
            needFlip,
            boundary
        }
    }

    render() {
        return this.props.children
    }
}