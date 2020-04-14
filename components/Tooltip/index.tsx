import * as React from "react";
import PropTypes from "prop-types";
import Overlay, { CommonProps } from '../Common/Overlay';
import { PopupContext } from "../Common/contexts";
import { classNames } from "../utils";

export interface TooltipProps extends CommonProps {
    title: string | React.ReactNode;
}

export function getTransform(placement: any) {
    const y = { transform: "translateY(-50%)" };
    const x = { transform: "translateX(-50%)" };
    const posMap: any = {
        top: x,
        bottom: x,
        left: y,
        right: y
    };

    return posMap[placement];
}

export function handleArrowStyle(left: number, top: number, placement: any) {
    const isVertical = placement === "left" || placement === "right";
    const style: React.CSSProperties = {};

    if (isVertical) {
        style.top = `${top}px`;
    } else {
        style.left = `${left}px`;
    }

    return {
        ...style,
        ...getTransform(placement)
    };
}

export default function Tooltip(props: TooltipProps) {
    const {
        title,
        children,
        placement,
        style = {},
        ...otherProps
    } = props;
    style.position = "relative";
    style.willChange = "transform";

    const popup = title ? (
        <PopupContext.Consumer>
            {
                ({ arrowLeft, arrowTop, placement: p }) => (
                    <div className={
                        classNames(
                            "tooltip",//.tooltip{opacity: 0}
                            "show",//.tooltip.show{opacity: .9},
                            `bs-tooltip-${p || placement}`
                        )
                    } style={style}>
                        <div className="arrow"
                            style={handleArrowStyle(arrowLeft, arrowTop, placement)} />
                        <div className="tooltip-inner">
                            {title}
                        </div>
                    </div>
                )
            }
        </PopupContext.Consumer>
    ) : null;

    return (
        <Overlay
            placement={placement}
            popup={popup}
            alignment="center"
            unmountOnExit
            verticalCenter
            {...otherProps}>
            {children}
        </Overlay>
    );
}

Tooltip.defaultProps = {
    trigger: "hover",
    placement: "top"
};
Tooltip.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired
};