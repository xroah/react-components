import * as React from "react";
import PropTypes from "prop-types";
import Overlay, { CommonProps } from './Overlay';
import { classNames } from "./utils";

export interface TooltipProps extends CommonProps {
    
}

export default class Tooltip extends React.Component<TooltipProps> {

    static defaultProps = {
        trigger: ["hover"]
    };
    static propTypes = {
        title: PropTypes.node.isRequired
    };

    render() {
        const {
            title,
            children,
            placement = "top",
            className,
            offset,
            ...otherProps
        } = this.props;
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
        const popup = (
            <div className={
                classNames(
                    "show",
                    "tooltip",
                    `bs-tooltip-${placement}`
                )
            }>
                <div className="arrow" style={{ ...posMap[placement] }} />
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

}