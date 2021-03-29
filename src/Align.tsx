import * as React from "react"
import mergeRef from "reap-utils/lib/react/merge-ref"
import getScrollParent from "reap-utils/lib/dom/get-scroll-parent"
import classNames from "reap-utils/lib/class-names"
import reflow from "reap-utils/lib/dom/reflow"
import {
    getPositionedParent,
    getRelativeOffset,
    handleOffset
} from "./utils"
import {
    BaseAlignment,
    position,
    SpareSpace,
    AlignProps
} from "./interface"

export default class Popup extends React.Component<AlignProps> {
    private childRef = React.createRef<HTMLElement>()

    //the left value and top value relative to top-left of the target
    getBaseAlignmentPosition(
        toBeAligned: HTMLElement,
        target: HTMLElement
    ): BaseAlignment {
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
    getSpareSpace(
        parent: HTMLElement,
        target: HTMLElement,
        el: HTMLElement
    ): SpareSpace {
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
            right: rectLeft + elWidth + targetRect.width - maxWidth + hOffset,
            bottom: rectTop + elHeight + targetRect.height - maxHeight + hOffset,
            left: rectLeft - elWidth - vOffset
        }
    }

    getTargetOrChildSize(type: "target" | "child" = "target") {
        const target = this.props.target!
        const child = this.childRef.current!
        const el = type === "target" ? target : child

        return {
            width: el.offsetWidth,
            height: el.offsetHeight
        }
    }

    getAlginObj(left: number, top: number, placement: position) {
        return {
            left,
            top,
            placement
        }
    }

    handleAlignment(base: BaseAlignment, space: SpareSpace) {
        const p = this.props.placement!
        const targetSize = this.getTargetOrChildSize()
        const childSize = this.getTargetOrChildSize("child")
        const [hOffset, vOffset] = handleOffset(this.props.offset)
        const alignFnMap = {
            bottom: () => {
                const left = base.left + hOffset
                const top = base.top + vOffset + targetSize.height

                return this.getAlginObj(left, top, "bottom")
            },
            top: () => {
                const left = base.left + hOffset
                const top = base.top - childSize.height - vOffset

                return this.getAlginObj(left, top, "top")
            },
            left: () => {
                const left = base.left - childSize.width - hOffset
                const top = base.top + vOffset

                return this.getAlginObj(left, top, "left")
            },
            right: () => {
                const left = base.left + targetSize.width - hOffset
                const top = base.top + vOffset

                return this.getAlginObj(left, top, "right")
            }
        }
        const flip = this.isNeedFlip(space, p)

        if (flip) {
            return alignFnMap[flip]()
        }

        return alignFnMap[p]()
    }

    isNeedFlip(space: SpareSpace, placement: position): false | position {
        let ret: false | position = false

        switch (placement) {
            case "bottom":
                if (space.bottom > 0) {
                    ret = "top"
                }
                break
            case "top":
                if (space.top < 0) {
                    ret = "bottom"
                }
                break
            case "left":
                if (space.left < 0) {
                    ret = "right"
                }
                break
            case "right":
                if (space.right > 0) {
                    ret = "left"
                }
        }

        return ret
    }

    align() {
        const {current: child} = this.childRef
        let {
            placement,
            target
        } = this.props
        const p = placement!

        if (!child || !target) {
            return this.getAlginObj(0, 0, p)
        }

        reflow(child)

        const baseAlignment = this.getBaseAlignmentPosition(child, target)
        const spareSpace = this.getSpareSpace(baseAlignment.parent, target, child)
        const aligned = this.handleAlignment(baseAlignment, spareSpace)
        const placementOffset = this.handlePlacement(p)

        return this.getAlginObj(
            aligned.left + placementOffset.left,
            aligned.top + placementOffset.top,
            aligned.placement
        )
    }

    handlePlacement(placement: position) {
        const {
            verticalCenter,
            alignment
        } = this.props
        const targetSize = this.getTargetOrChildSize()
        const childSize = this.getTargetOrChildSize("child")
        let left = 0
        let top = 0

        if (placement === "left" || placement === "right") {
            //vertical center
            if (verticalCenter) {
                top += (targetSize.height - childSize.height) / 2
            }
        } else {
            //horizontal alignment
            switch (alignment) {
                case "center":
                    left += (targetSize.width - childSize.width) / 2
                    break
                case "right":
                    left += targetSize.width - childSize.width
            }
        }

        return this.getAlginObj(left, top, placement)
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
        const _children = children as React.ReactElement
        const {
            style: childStyle,
            className: childClassName
        } = _children.props

        if (!children) {
            return null
        }

        return React.cloneElement(
            _children,
            {
                //make the children's ref(if has) and this.childRef reference the node(ref func)
                ref: mergeRef((_children as any).ref, this.childRef),
                style: {
                    ...childStyle,
                    ...style
                },
                className: classNames(childClassName, className)
            }
        )
    }
}