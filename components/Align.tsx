import * as React from "react";
import { CommonProps } from "./CommonPropsInterface";
import { getScrollParent } from "./utils";

export type position = "top" | "right" | "bottom" | "left";

export interface AlignProps extends CommonProps<HTMLElement> {
    placement?: position;
    offset?: number | number[];
    target: HTMLElement | null;
    alignment?: "left" | "center" | "right";
    verticalCenter?: boolean;
}

export default class Popup extends React.Component<AlignProps> {

    childRef = React.createRef<HTMLElement>();

    handleOffset(offset?: number | number[]) {
        let ret: number[];

        if (Array.isArray(offset)) {
            const len = offset.length;

            switch (len) {
                case 0:
                    ret = [0, 0];
                    break;
                case 1:
                    ret = Array(2).fill(offset[0]);
                default:
                    ret = offset.slice(0, 2);
            }

            if (!len) {
                ret = [0, 0];
            }
        } else {
            ret = Array(2).fill(offset === undefined ? 0 : offset);
        }

        return ret;
    }

    getPositionedParent(el: HTMLElement) {
        const body = document.body;
        let parent = el;

        while ((parent = parent.parentNode as HTMLElement) && parent !== body) {
            if (getComputedStyle(parent).getPropertyValue("position") !== "static") {
                return parent;
            }
        }

        return body;
    }

    getScrollOffset(el: HTMLElement) {
        let left = 0;
        let top = 0;
        const body = document.body;
        const html = document.documentElement;

        if (el === body) {
            left = body.scrollLeft || html.scrollLeft;
            top = body.scrollTop || html.scrollTop;
        } else {
            left = el.scrollLeft;
            top = el.scrollTop;
        }

        return { left, top };
    }

    //get left and top(positioned element) relative to its scroll parent
    getRelativeOffset(parent: HTMLElement, el: HTMLElement) {
        const parentRect = parent.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        let { left, top } = this.getScrollOffset(parent);
        let rectLeft = 0;
        let rectTop = 0;

        if (parent === el) {
            left = top = 0;
        } else if (parent === document.body) {
            left += elRect.left;
            top += elRect.top;
            rectLeft = left;
            rectTop = top;
        } else {
            //top and left offset relative to its parent
            rectLeft = elRect.left - parentRect.left;
            rectTop = elRect.top - parentRect.top;
            left += rectLeft;
            top += rectTop;
        }

        return {
            left,
            top,
            rectLeft,
            rectTop
        };
    }

    //the left value and top value relative to top-left of the target
    getBaseAlignmentPosition(toBeAligned: HTMLElement, target: HTMLElement) {
        const positioned = this.getPositionedParent(toBeAligned);
        const scrollParent = getScrollParent(target);
        //if positioned element is in scrollParent or is scrollParent
        //the element offset is relative to the scrollParent, otherwise relative to body
        const relativeParent = (scrollParent === positioned || scrollParent.contains(positioned)) ? scrollParent : document.body;
        const {
            left: positionedLeft,
            top: positionedTop
        } = this.getRelativeOffset(relativeParent, positioned);
        const {
            left: targetLeft,
            top: targetTop
        } = this.getRelativeOffset(relativeParent, target);

        return {
            left: targetLeft - positionedLeft,
            top: targetTop - positionedTop,
            parent: relativeParent
        };
    }

    //top/bottom/left/right spare space
    getSpareSpace(parent: HTMLElement, target: HTMLElement, el: HTMLElement) {
        const targetRect = target.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const body = document.body;
        const [hOffset, vOffset] = this.handleOffset(this.props.offset);
        const maxWidth = parent.clientWidth;
        const maxHeight = parent === body ? window.innerHeight : parent.clientHeight;
        const rectLeft = parent === body ? targetRect.left : targetRect.left - parentRect.left;
        const rectTop = parent === body ? targetRect.top : targetRect.top - parentRect.top;
        const elHeight = el.offsetHeight;
        const elWidth = el.offsetWidth;

        return {
            top: rectTop - elHeight - vOffset,
            right: rectLeft + elWidth + target.offsetWidth - maxWidth + hOffset,
            bottom: rectTop + elHeight + target.offsetHeight - maxHeight + hOffset,
            left: rectLeft - elWidth - vOffset
        };
    }

    handlePosition() {
        const child = this.childRef.current;
        let {
            placement,
            target,
            offset,
            verticalCenter,
            alignment
        } = this.props;
        let left = 0;
        let top = 0;

        if (!child || !target) return { left, top, placement };

        const targetWidth = target.offsetWidth;
        const targetHeight = target.offsetHeight;
        const childHeight = child.offsetHeight;
        const childWidth = child.offsetWidth;
        const [hOffset, vOffset] = this.handleOffset(offset);
        const {
            left: baseLeft,
            top: baseTop,
            parent
        } = this.getBaseAlignmentPosition(child, target);

        const {
            bottom: bottomSpace,
            top: topSpace,
            left: leftSpace,
            right: rightSpace
        } = this.getSpareSpace(parent, target, child);
        const placeBottom = (flip: boolean = true) => {
            left = baseLeft + hOffset;
            top = baseTop + vOffset + targetHeight;
            placement = "bottom";

            //flip to top
            if (flip && bottomSpace > 0) {
                placeTop(false);
            }
        };
        const placeTop = (flip: boolean = true) => {
            left = baseLeft + hOffset;
            top = baseTop - childHeight - vOffset;
            placement = "top";

            //flip to bottom
            if (flip && topSpace < 0) {
                placeBottom(false);
            }
        };
        const placeLeft = (flip: boolean = true) => {
            left = baseLeft - childWidth - hOffset;
            top = baseTop + vOffset;
            placement = "left";

            //flip to right
            if (flip && leftSpace < 0) {
                placeRight(false);
            }
        };
        const placeRight = (flip: boolean = true) => {
            left = baseLeft + targetWidth - hOffset;
            top = baseTop + vOffset;
            placement = "right";

            //flip to left
            if (flip && rightSpace > 0) {
                placeLeft(false);
            }
        };
        const placementFnMap: any = {
            top: placeTop,
            bottom: placeBottom,
            left: placeLeft,
            right: placeRight
        };

        placementFnMap[placement as position]();

        if (placement === "left" || placement === "right") {
            //vertical center
            if (verticalCenter) {
                top += (targetHeight - childHeight) / 2;
            }
        } else {
            //horizontal alignment
            switch (alignment) {
                case "center":
                    left += (targetWidth - childWidth) / 2;
                    break;
                case "right":
                    left += targetWidth - childWidth;
                    break;
                default:
            }
        }

        return { left, top, placement };
    }



    //if the element top/right/bottom/left is out of the corresponding edge
    adjustElement() {
        const { target } = this.props as any;
        const child = this.childRef.current as HTMLElement;
        const { parent } = this.getBaseAlignmentPosition(child, target);
        const childRect = child.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const body = document.body;
        const rectLeft = parent === body ? childRect.left : childRect.left - parentRect.left;
        const rectTop = parent === body ? childRect.top : childRect.top - parentRect.top;
        let leftOffset = 0;
        let topOffset = 0;
        const elHeight = child.offsetHeight;
        const elWidth = child.offsetWidth;
        const rightSpace = rectLeft + elWidth - parent.clientWidth;
        const bottomSpace = rectTop + elHeight - (parent === body ? window.innerHeight : parent.clientHeight);

        if (rectLeft < 0) {
            leftOffset = Math.abs(rectLeft);
        } else if (rightSpace > 0) {
            leftOffset = -rightSpace;
        }

        if (rectTop < 0) {
            topOffset = Math.abs(rectTop);
        } else if (bottomSpace > 0) {
            topOffset = -bottomSpace;
        }

        return {
            leftOffset,
            topOffset
        };
    }

    align = () => {
        return this.handlePosition();
    }

    handleRefs(...refs: React.Ref<any>[]) {
        return (node: any) => {
            refs.forEach((ref: any) => {
                if (ref && ("current" in ref)) {
                    ref.current = node;
                }
            });
        };
    }

    render() {
        const {
            children,
            ...otherProps
        } = this.props;

        delete otherProps.verticalCenter;
        delete otherProps.offset;
        delete otherProps.target;
        delete otherProps.placement;
        delete otherProps.alignment;

        if (!children) return null;

        if (React.isValidElement(children)) {
            return React.cloneElement<any>(
                children as React.ReactElement,
                {
                    //make the children's ref(if has) and this.childRef reference the node(ref func)
                    ref: this.handleRefs((children as any).ref, this.childRef),
                    ...otherProps
                }
            );
        }

        return children;
    }
}