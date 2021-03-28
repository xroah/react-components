import * as React from "react"
import mergeRef from "reap-utils/lib/react/merge-ref"
import getScrollParent from "reap-utils/lib/dom/get-scroll-parent"
import classNames from "reap-utils/lib/class-names"
import {
    getPositionedParent,
    getRelativeOffset,
    handleOffset
} from "./utils"

export type position = "top" | "right" | "bottom" | "left"

export interface AlignProps {
    placement?: position
    offset?: number | number[]
    target: HTMLElement | null
    alignment?: "left" | "center" | "right"
    verticalCenter?: boolean
    style?: React.CSSProperties,
    className?: string
}

export default class Popup extends React.Component<AlignProps> {
    private childRef = React.createRef<HTMLElement>()

    //the left value and top value relative to top-left of the target
    getBaseAlignmentPosition(toBeAligned: HTMLElement, target: HTMLElement) {
        const positioned = getPositionedParent(toBeAligned)
        const scrollParent = getScrollParent(target)
        //if the positioned element is in scrollParent or is scrollParent
        //the element offset is relative to the scrollParent, otherwise relative to body
        const relativeParent = (
            scrollParent === positioned || scrollParent.contains(positioned) ?
                scrollParent : document.body
        )
        const {
            left: positionedLeft,
            top: positionedTop
        } = getRelativeOffset(relativeParent, positioned)
        const {
            left: targetLeft,
            top: targetTop
        } = getRelativeOffset(relativeParent, target)

        return {
            left: targetLeft - positionedLeft,
            top: targetTop - positionedTop,
            parent: relativeParent
        }
    }

    //top/bottom/left/right spare space
    getSpareSpace(parent: HTMLElement, target: HTMLElement, el: HTMLElement) {
        const targetRect = target.getBoundingClientRect()
        const parentRect = parent.getBoundingClientRect()
        const body = document.body
        const [hOffset, vOffset] = handleOffset(this.props.offset)
        const maxWidth = parent.clientWidth
        const maxHeight = parent === body ? window.innerHeight : parent.clientHeight
        const rectLeft = parent === body ? targetRect.left : targetRect.left - parentRect.left
        const rectTop = parent === body ? targetRect.top : targetRect.top - parentRect.top
        const elHeight = el.offsetHeight
        const elWidth = el.offsetWidth

        return {
            top: rectTop - elHeight - vOffset,
            right: rectLeft + elWidth + target.offsetWidth - maxWidth + hOffset,
            bottom: rectTop + elHeight + target.offsetHeight - maxHeight + hOffset,
            left: rectLeft - elWidth - vOffset
        }
    }

    align() {
        const child = this.childRef.current
        let {
            placement,
            target,
            offset,
            verticalCenter,
            alignment
        } = this.props
        let left = 0
        let top = 0

        if (!child || !target) {
            return {
                left,
                top,
                placement
            }
        }

        const targetWidth = target.offsetWidth
        const targetHeight = target.offsetHeight
        const childHeight = child.offsetHeight
        const childWidth = child.offsetWidth
        const [hOffset, vOffset] = handleOffset(offset)
        const {
            left: baseLeft,
            top: baseTop,
            parent
        } = this.getBaseAlignmentPosition(child, target)
        const {
            bottom: bottomSpace,
            top: topSpace,
            left: leftSpace,
            right: rightSpace
        } = this.getSpareSpace(parent, target, child)
        const placeBottom = (flip: boolean = true) => {
            left = baseLeft + hOffset
            top = baseTop + vOffset + targetHeight
            placement = "bottom"

            //flip to top
            if (flip && bottomSpace > 0) {
                placeTop(false)
            }
        }
        const placeTop = (flip: boolean = true) => {
            left = baseLeft + hOffset
            top = baseTop - childHeight - vOffset
            placement = "top"

            //flip to bottom
            if (flip && topSpace < 0) {
                placeBottom(false)
            }
        }
        const placeLeft = (flip: boolean = true) => {
            left = baseLeft - childWidth - hOffset
            top = baseTop + vOffset
            placement = "left"

            //flip to right
            if (flip && leftSpace < 0) {
                placeRight(false)
            }
        }
        const placeRight = (flip: boolean = true) => {
            left = baseLeft + targetWidth - hOffset
            top = baseTop + vOffset
            placement = "right"

            //flip to left
            if (flip && rightSpace > 0) {
                placeLeft(false)
            }
        }
        const placementFnMap: any = {
            top: placeTop,
            bottom: placeBottom,
            left: placeLeft,
            right: placeRight
        }

        placementFnMap[placement as position]()

        if (placement === "left" || placement === "right") {
            //vertical center
            if (verticalCenter) {
                top += (targetHeight - childHeight) / 2
            }
        } else {
            //horizontal alignment
            switch (alignment) {
                case "center":
                    left += (targetWidth - childWidth) / 2
                    break
                case "right":
                    left += targetWidth - childWidth
                    break
                default:
            }
        }

        return {
            left,
            top,
            placement
        }
    }

    //if the element top/right/bottom/left is out of the corresponding edge
    adjustElement() {
        const {
            target
        } = this.props as any
        const child = this.childRef.current as HTMLElement
        const {
            parent
        } = this.getBaseAlignmentPosition(child, target)
        const childRect = child.getBoundingClientRect()
        const parentRect = parent.getBoundingClientRect()
        const body = document.body
        const rectLeft = parent === body ? childRect.left : childRect.left - parentRect.left
        const rectTop = parent === body ? childRect.top : childRect.top - parentRect.top
        let leftOffset = 0
        let topOffset = 0
        const elHeight = child.offsetHeight
        const elWidth = child.offsetWidth
        const rightSpace = rectLeft + elWidth - parent.clientWidth
        const bottomSpace = rectTop + elHeight - (parent === body ? window.innerHeight : parent.clientHeight)

        if (rectLeft < 0) {
            leftOffset = Math.abs(rectLeft)
        } else if (rightSpace > 0) {
            leftOffset = -rightSpace
        }

        if (rectTop < 0) {
            topOffset = Math.abs(rectTop)
        } else if (bottomSpace > 0) {
            topOffset = -bottomSpace
        }

        return {
            leftOffset,
            topOffset
        }
    }

    render() {
        const {
            children,
            style,
            className
        } = this.props
        const child = React.Children.only(children) as React.ReactElement
        const {
            style: childStyle,
            className: childClassName
        } = child.props

        if (!children) {
            return null
        }

        if (React.isValidElement(children)) {
            return React.cloneElement(
                child,
                {
                    //make the children's ref(if has) and this.childRef reference the node(ref func)
                    ref: mergeRef((children as any).ref, this.childRef),
                    style: {
                        ...childStyle,
                        ...style
                    },
                    className: classNames(childClassName, className)
                }
            )
        }

        return children
    }
}