import * as React from "react";
import { CommonProps } from "../CommonPropsInterface";

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

    getElementRect(parent: HTMLElement, target: HTMLElement) {
        const parentRect = parent.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        return {
            top: targetRect.top - parentRect.top,
            left: targetRect.left - parentRect.left,
            width: targetRect.width,
            height: targetRect.height
        };
    }

    placeTop(parent: HTMLElement, target: HTMLElement, flip: boolean = true) {
        const child = this.childRef.current as HTMLElement;
        const [hOffset, vOffset] = this.handleOffset(this.props.offset);
        const childHeight = child.offsetHeight;
        let {
            left,
            top
        } = this.getElementRect(parent, target);
        let placement = "top";
        
        left += hOffset;
        top -= childHeight - vOffset;

        if (flip) {
            if (top < 0) {
                ({ left, top, placement } = this.placeBottom(parent, target, false));
            }
        }

        return { left, top, placement };
    }

    placeBottom(parent: HTMLElement, target: HTMLElement, flip: boolean = true) {
        const child = this.childRef.current as HTMLElement;
        const [hOffset, vOffset] = this.handleOffset(this.props.offset);
        const parentHeight = parent.scrollHeight;
        const childHeight = child.offsetHeight;
        let {
            left,
            top,
            height: targetHeight
        } = this.getElementRect(parent, target);
        let placement = "bottom";

        left += hOffset;
        top += targetHeight + vOffset;

        if (flip) {
            if (childHeight + top > parentHeight) {
                ({ left, top, placement } = this.placeTop(parent, target, false));
            }
        }

        return { left, top, placement };
    }

    placeLeft(parent: HTMLElement, target: HTMLElement, flip: boolean = true) {
        const child = this.childRef.current as HTMLElement;
        const [hOffset, vOffset] = this.handleOffset(this.props.offset);
        const childWidth = child.offsetWidth;
        let {
            left,
            top
        } = this.getElementRect(parent, target);
        let placement = "left";

        left -= childWidth - hOffset;
        top += vOffset;

        if (flip) {
            if (left < 0) {
                ({ left, top, placement } = this.placeRight(parent, target, false));
            }
        }

        return { left, top, placement };
    }

    placeRight(parent: HTMLElement, target: HTMLElement, flip: boolean = true) {
        const child = this.childRef.current as HTMLElement;
        const [hOffset, vOffset] = this.handleOffset(this.props.offset);
        const parentWidth = parent.scrollWidth;
        const childWidth = child.offsetWidth;
        let {
            left,
            top,
            width: targetWidth
        } = this.getElementRect(parent, target);
        let placement = "right";

        left += targetWidth + hOffset;
        top += vOffset;

        if (flip) {
            if (left + childWidth > parentWidth) {
                ({ left, top, placement } = this.placeLeft(parent, target, false));
            }
        }

        return { left, top, placement };
    }

    handlePosition(parent: HTMLElement | null) {
        const child = this.childRef.current;
        let {
            placement,
            target,
            verticalCenter
        } = this.props as any;
        let left = 0;
        let top = 0;

        if (!child || !target || !parent) return { left, top, placement };

        const {
            width: targetWidth,
            height: targetHeight
        } = this.getElementRect(parent, target);
        const parentWidth = parent.scrollWidth;
        const parentHeight = parent.scrollHeight;
        const childHeight = child.offsetHeight;
        const childWidth = child.offsetWidth;

        switch (placement) {
            case "top":
                ({ left, top, placement } = this.placeTop(parent, target, true))
                break;
            case "right":
                ({ left, top, placement } = this.placeRight(parent, target, true))
                break;
            case "left":
                ({ left, top, placement } = this.placeLeft(parent, target, true))
                break;
            default:
                ({ left, top, placement } = this.placeBottom(parent, target, true))
        }

        left = this.handleAlignment(targetWidth, childWidth, parentWidth, left);
        
        if (left < 0) {
            left = 0;
        } else if (childWidth + left > parentWidth) {
            left = parentWidth - childWidth;
        }

        if (top < 0) {
            top = 0;
        } else if (childHeight + top > parentHeight) {
            top = parentHeight - childHeight;
        }

        if (
            verticalCenter &&
            (placement === "left" || placement === "right") &&
            //have enough space
            top > 0 &&
            top + childHeight < parentHeight
        ) {
            top += (targetHeight - childHeight) / 2;
        }

        return { left, top, placement };
    }

    handleAlignment(targetWidth: number, childWidth: number, parentWidth: number, left: number) {
        const {
            props: {
                alignment,
                placement = ""
            },
        } = this;
        const posMap: any = {
            "top": true,
            "bottom": true
        };

        if (
            (placement in posMap) &&
            //have enough space
            left > 0 &&
            left + childWidth < parentWidth
        ) {
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

        return left;
    };

    update = (parent: HTMLElement | null) => {
        return this.handlePosition(parent);
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