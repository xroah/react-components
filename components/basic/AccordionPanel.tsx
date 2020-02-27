import * as React from "react";
import PropTypes from "prop-types";
import Collapse from "./Collapse";
import {
    handleFuncProp,
    classNames
} from "../utils";
import { AccordionContext } from "../contexts";
import { CommonProps } from "../CommonPropsInterface";

interface PanelProps extends CommonProps<HTMLDivElement> {
    header: React.ReactNode;
    panelKey?: string | number; 
    onHeaderClick?: (key?: string, evt?: React.MouseEvent) => void; 
}

export default function AccordionPanel(props: PanelProps) {
    const {
        header,
        children,
        className,
        panelKey,
        onHeaderClick,
        ...otherProps
    } = props;
    const handleHeaderClick = (evt: React.MouseEvent) => {
        handleFuncProp(onHeaderClick)(panelKey, evt);
    };
    const style: React.CSSProperties = {};

    if (onHeaderClick) style.cursor = "pointer";

    return (
        <AccordionContext.Consumer>
            {
                context => (
                    <div className={classNames(className, "card")} {...otherProps}>
                        <div
                            style={style}
                            className="card-header"
                            onClick={handleHeaderClick}>{header}</div>
                        <Collapse isOpen={context.has(panelKey)}>
                            <div className="card-body">
                                {children}
                            </div>
                        </Collapse>
                    </div>
                )
            }
        </AccordionContext.Consumer>
    );
}

AccordionPanel.propTypes = {
    header: PropTypes.node.isRequired,
    headerClickable: PropTypes.bool
};