import * as React from "react";
import PropTypes from "prop-types";
import Collapse from "./Collapse";
import {
    handleFuncProp,
    AccordionContext,
    classNames
} from "../utils";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    header: React.ReactNode;
    headerClickable?: boolean;
    __key__?: string | number; //internal only
    __onHeaderClick__?: Function; //internal only
}

export default function AccordionPanel(props: PanelProps) {
    const {
        header,
        children,
        className,
        __key__,
        ...otherProps
    } = props;
    const context = React.useContext(AccordionContext);
    const handleHeaderClick = () => {
        const {
            __key__,
            __onHeaderClick__,
            headerClickable
        } = props;

        if (!headerClickable) return;

        handleFuncProp(__onHeaderClick__)(__key__);
    };

    delete otherProps.__onHeaderClick__;
    delete otherProps.headerClickable;

    return (
        <div className={classNames(className, "card")} {...otherProps}>
            <div
                style={{ cursor: "pointer" }}
                className="card-header"
                onClick={handleHeaderClick}>{header}</div>
            <Collapse isOpen={context.has(__key__)}>
                <div className="card-body">
                    {children}
                </div>
            </Collapse>
        </div>
    );
}

AccordionPanel.propTypes = {
    header: PropTypes.node.isRequired,
    headerClickable: PropTypes.bool
};
AccordionPanel.defaultProps = {
    headerClickable: true
};