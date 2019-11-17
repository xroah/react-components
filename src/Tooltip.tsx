import * as React from "react";
import PropTypes from "prop-types";
import Overlay, { CommonProps } from './Overlay';
import { classNames } from "./utils";

export interface TooltipProps extends CommonProps {

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
        title,
        children,
        placement = "top",
        offset,
        ...otherProps
    } = props;

    const popup = (
        <div className={
            classNames(
                "show",
                "tooltip",
                `bs-tooltip-${placement}`
            )
        }>
            <div className="arrow" style={getStyle(placement)} />
            <div className="tooltip-inner">
                {title}
            </div>
        </div>
    );

    return (
        <Overlay
            placement={placement}
            popup={popup}
            align="center"
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
    trigger: ["hover"]
};
Tooltip.propTypes = {
    title: PropTypes.node.isRequired
};