import * as React from "react";
import { createPortal, findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import {
    ElementRect,
    handleFuncProp,
    throttle,
    getElementRect
} from "../utils";
import Fade from "../Fade";
import { PopupContext } from "../contexts";

export type position = "top" | "right" | "bottom" | "left";

export interface AlignProps extends React.HTMLAttributes<HTMLElement> {
    placement?: position;
    flip?: boolean;
    offset?: number | number[];
    target: HTMLElement | null;
    alignment?: "left" | "center" | "right";
    verticalCenter?: boolean;
}

export default class Popup extends React.Component<AlignProps> {

    childRef = React.createRef<HTMLElement>();

    handleOffset(offset: number | number[]) {
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
            ret = Array(2).fill(offset);
        }

        return ret;
    }

    alignRight = (rect: ElementRect, hOffset: number, vOffset: number) => {
        let left = rect.left + rect.width + hOffset;
        let top = rect.top + vOffset;

        return { left, top, placement: "right" };
    }

    alignTop = (rect: ElementRect, height: number, hOffset: number, vOffset: number) => {
        let left = rect.left + hOffset;
        let top = rect.top - height - vOffset;

        return { left, top, placement: "top" }
    }

    alignLeft = (rect: ElementRect, width: number, hOffset: number, vOffset: number) => {
        let left = rect.left - width - hOffset;
        let top = rect.top + vOffset;

        return { left, top, placement: "left" }
    }

    alignBottom = (rect: ElementRect, hOffset: number, vOffset: number) => {
        let left = rect.left + hOffset;
        let top = rect.top + rect.height + vOffset;

        return { left, top, placement: "bottom" }
    }

    handlePosition() {
        const {
            placement,
            flip,
            target,
            offset,
            verticalCenter
        } = this.props;
        let obj: any;
        const el = this.childRef.current;

        if (!el || !target) return {left: 0, top: 0, placement};

        const width = el.offsetWidth;
        const height = el.offsetHeight;
        const windowWidth = document.documentElement.clientWidth;
        //innerWidth/innerHeight contains width of scrollbar
        //usually webpage does not have horizontal scrollbar
        const windowHeight = window.innerHeight;
        const [hOffset, vOffset] = this.handleOffset(offset as number);
        const rect = getElementRect(target);

        switch (placement) {
            case "top":
                obj = this.alignTop(rect, height, hOffset, vOffset);

                if (flip && rect.bottom - rect.height < height) {
                    obj = this.alignBottom(rect, hOffset, vOffset);
                }
                break;
            case "right":
                obj = this.alignRight(rect, hOffset, vOffset);

                if (flip && windowWidth - rect.right < width) {
                    obj = this.alignLeft(rect, width, hOffset, vOffset);
                }
                break;
            case "left":
                obj = this.alignLeft(rect, width, hOffset, vOffset);

                if (flip && rect.right - rect.width < width) {
                    obj = this.alignRight(rect, hOffset, vOffset);
                }
                break;
            default:
                obj = this.alignBottom(rect, hOffset, vOffset);

                if (flip && windowHeight - rect.bottom < height) {
                    obj = this.alignTop(rect, height, hOffset, vOffset);
                }
        }

        let { left, top, placement: _placement } = obj;
        left = this.handleAlignment(rect, left, width);

        if (
            verticalCenter &&
            (placement === "left" || placement === "right")
        ) top += (rect.height - height) / 2;

        //left is negative or left is bigger than window.innerWidth
        if (left < 0) {
            left = 0;
        } else if (left + width >= windowWidth) {
            left = windowWidth - width;
        }

        return {
            left,
            top,
            placement: _placement
        };
    }

    handleAlignment(rect: ElementRect, left: number, width: number) {
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

        if (placement in posMap) {
            switch (alignment) {
                case "center":
                    left += (rect.width - width) / 2;
                    break;
                case "right":
                    left += rect.width - width;
                    break;
                default:
            }
        }

        return left;
    };

    update = () => {
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

        delete otherProps.flip;
        delete  otherProps.verticalCenter;
        delete otherProps.offset;
        delete otherProps.target;
        delete otherProps.placement;
        delete otherProps.alignment;

        if (!children) return null;
        
        if (React.isValidElement(children)) {
            return React.cloneElement<any>(
                children as React.ReactElement,
                {
                    ref: this.handleRefs((children as any).ref, this.childRef),
                    ...otherProps
                }
            );
        }

        return children;
    }
}