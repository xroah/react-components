import * as React from "react";
import PropTypes from "prop-types";
import Overlay, { CommonProps } from './Overlay';

export interface TooltipProps extends CommonProps {
    text?: string | React.ReactNode;
}

export function getStyle(placement: any) {
    const leftStyle = {
        transform: "translateX(-50%)",
        left: "50%"
    };
    const topStyle = {
        transform: "translateY(-50%)",
        top: "50%"
    };
    const posMap: any = {
        top: leftStyle,
        bottom: leftStyle,
        left: topStyle,
        right: topStyle
    };

    return posMap[placement];
}

export default function Tooltip(props: TooltipProps) {
    const {
        text,
        children,
        placement,
        offset,
        style = {},
        ...otherProps
    } = props;
    style.position = "relative";
    style.willChange = "transform";

    const popup = text ? (
        <div className="tooltip show" style={style}>
            <div className="arrow" style={getStyle(placement)} />
            <div className="tooltip-inner">
                {text}
            </div>
        </div>
    ) : null;

    return (
        <Overlay
            placement={placement}
            popup={popup}
            alignment="center"
            offset={offset}
            alignmentPrefix="bs-tooltip"
            unmountOnclose
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
    title: PropTypes.node.isRequired
};