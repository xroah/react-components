import * as React from "react";
import PropTypes from "prop-types";
import Overlay, { CommonProps } from "./Overlay";
import { handleArrowStyle } from "./Tooltip";
import { PopupContext } from "./contexts";
import { classNames } from "./utils";

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
        <PopupContext.Consumer>
            {
                ({ arrowLeft, arrowTop, placement: p }) => (
                    <div style={style}
                        className={
                            classNames(
                                "popover",
                                `bs-popover-${p || placement}`
                            )
                        }>
                        <div className="arrow" style={{
                            ...handleArrowStyle(arrowLeft, arrowTop, placement),
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
                )
            }
        </PopupContext.Consumer>
    );
    return (
        <Overlay
            unmountOnExit
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