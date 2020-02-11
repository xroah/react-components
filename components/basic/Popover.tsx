import * as React from "react";
import PropTypes from "prop-types";
import Overlay, { CommonProps } from "./Overlay";
import { getStyle } from "./Tooltip";

export interface PopoverProps extends CommonProps {
    header?: string | React.ReactNode;
    content: React.ReactNode;
}

export default function Popover(props: PopoverProps) {
    const {
        header,
        children,
        placement,
        content,
        style = {},
        ...otherProps
    } = props;
    style.position = "relative";

    const popup = (
        <div style={style} className="popover">
            <div className="arrow" style={{
                ...getStyle(placement),
                margin: 0
            }} />
            {
                !!header && (
                    <h3 className="popover-header">{header}</h3>
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
            alignment="center"
            placement={placement}
            popup={popup}
            verticalCenter
            {...otherProps}>
            {children}
        </Overlay>
    );

}

Popover.propTypes = {
    header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired
};
Popover.defaultProps = {
    trigger: "click",
    placement: "right"
};