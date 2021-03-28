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
    Alignment,
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

    alignBottom(base: BaseAlignment, space: SpareSpace, flip = true): Alignment {
        //flip to top
        if (flip && space.bottom > 0) {
            return this.alignTop(base, space, false)
        }

        const [hOffset, vOffset] = handleOffset(this.props.offset)
        const left = base.left + hOffset
        const top = base.top + vOffset + this.getTargetOrChildSize().height

        return this.getAlginObj(left, top, "bottom")
    }

    alignTop(base: BaseAlignment, space: SpareSpace, flip = true): Alignment {
        //flip to bottom
        if (flip && space.top < 0) {
            return this.alignBottom(base, space, false)
        }

        const [hOffset, vOffset] = handleOffset(this.props.offset)
        const left = base.left + hOffset
        const top = base.top - this.getTargetOrChildSize("child").height - vOffset

        return this.getAlginObj(left, top, "top")
    }

    alignLeft(base: BaseAlignment, space: SpareSpace, flip = true): Alignment {
        //flip to right
        if (flip && space.left < 0) {
            return this.alignRight(base, space, false)
        }

        const [hOffset, vOffset] = handleOffset(this.props.offset)
        const left = base.left - this.getTargetOrChildSize("child").width - hOffset
        const top = base.top + vOffset

        return this.getAlginObj(left, top, "left")
    }

    alignRight(base: BaseAlignment, space: SpareSpace, flip = true): Alignment {
        //flip to right
        if (flip && space.right > 0) {
            return this.alignLeft(base, space, false)
        }

        const [hOffset, vOffset] = handleOffset(this.props.offset)
        const left = base.left + this.getTargetOrChildSize().width - hOffset
        const top = base.top + vOffset

        return this.getAlginObj(left, top, "right")
    }

    align() {
        const {current: child} = this.childRef
        let {
            placement,
            target
        } = this.props

        if (!child || !target) {
            return this.getAlginObj(0, 0, placement!)
        }

        reflow(child)

        const baseAlignment = this.getBaseAlignmentPosition(child, target)
        const spareSpace = this.getSpareSpace(baseAlignment.parent, target, child)
        const placementFnMap: {
            [prop: string]: "alignTop" | "alignBottom" | "alignLeft" | "alignRight"
        } = {
            top: "alignTop",
            bottom: "alignBottom",
            left: "alignLeft",
            right: "alignRight"
        }
        const aligned = this[placementFnMap[placement!]](baseAlignment, spareSpace)
        const placementOffset = this.handlePlacement(placement as position)

        return {
            left: aligned.left + placementOffset.left,
            top: aligned.top + placementOffset.top,
            placement
        }
    }

    handlePlacement(placement: position) {
        const {
            verticalCenter,
            alignment
        } = this.props
        let left = 0
        let top = 0

        if (placement === "left" || placement === "right") {
            //vertical center
            if (verticalCenter) {
                top += (
                    this.getTargetOrChildSize().height - this.getTargetOrChildSize("child").height
                ) / 2
            }
        } else {
            const targetWidth = this.getTargetOrChildSize().width
            const childWidth = this.getTargetOrChildSize("child").width
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
            top
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