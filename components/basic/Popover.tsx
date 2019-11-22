import * as React from "react";
import PropTypes from "prop-types";
import Overlay, { CommonProps } from "./Overlay";
import { getStyle } from "./Tooltip";
import { classNames } from "../utils";

export interface PopoverProps extends CommonProps {
    title?: string;
    content: React.ReactNode;
}

export default function Popover(props: PopoverProps) {
    const {
        title,
        children,
        placement = "right",
        content,
        offset,
        ...otherProps
    } = props;
    const popup = (
        <div className={
            classNames(
                "popover"
            )
        }>
            <div className="arrow" style={getStyle(placement)} />
            {
                !!title && (
                    <div className="popover-header">{title}</div>
                )
            }
            <div className="popover-body">
                {content}
            </div>
        </div>
    );
    return (
        <Overlay
            unmountOnclose
            alignmentPrefix="bs-popover"
            align="center"
            offset={offset}
            placement={placement}
            popup={popup}
            clearMargin={false}
            verticalCenter
            {...otherProps}>
            {children}
        </Overlay>
    );

}

Popover.propTypes = {
    content: PropTypes.node.isRequired
};
Popover.defaultProps = {
    trigger: ["click"]
};