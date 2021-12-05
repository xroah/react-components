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
import {getOffset, getWindowSize} from "./utils"

export default class Alignment extends React.Component<AlignmentProps> {
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
        const {width: ww, height: wh} = getWindowSize()
        const ret = {
            left: tRect.left - oRect.width - x,
            top: tRect.top - oRect.height - y,
            right: ww - tRect.right - oRect.width - x,
            bottom: wh - tRect.bottom - oRect.height - y,
            width: ww,
            height: wh
        }

        if (boundary !== document.scrollingElement) {
            const bRect = boundary.getBoundingClientRect()

            // top in viewport
            if (bRect.top > 0) {
                ret.top -= bRect.top
                ret.height -= bRect.top
            }

            // bottom in viewport
            if (bRect.bottom < window.innerHeight) {
                const bottomDistance = window.innerHeight - bRect.bottom

                ret.bottom -= bottomDistance
                ret.height -= bottomDistance
            }

            // left in viewport
            if (bRect.left > 0) {
                ret.left -= bRect.left
                ret.width -= bRect.left
            }

            // right in viewport
            if (bRect.right < window.innerWidth) {
                const rightDistance = window.innerWidth - bRect.right

                ret.right -= rightDistance
                ret.width -= rightDistance
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
        const {width: ww, height: wh} = getWindowSize()

        if (boundary === document.scrollingElement) {
            if (vSet.has(placement)) {
                if (oRect.left < 0) {
                    left += Math.abs(oRect.left)
                } else if (oRect.right > ww) {
                    left -= Math.abs(oRect.right - ww)
                }
            } else if (hSet.has(placement)) {
                if (oRect.top < 0) {
                    top += Math.abs(oRect.top)
                } else if (oRect.top > wh) {
                    top -= Math.abs(oRect.top - wh)
                }
            }
        } else {

        }

        return {
            left,
            top
        }
    }

    align(): AlignRet {
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
        // no enough space and fallback to other placements
        if (needFlip && fallback && fallback.length) {
            for (let f of fallback) {
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