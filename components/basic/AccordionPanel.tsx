import * as React from "react";
import PropTypes from "prop-types";
import Collapse from "./Collapse";
import {
    handleFuncProp,
    classNames
} from "../utils";
import { AccordionContext } from "../contexts";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    header: React.ReactNode;
    __key__?: string | number; //internal only
    __onHeaderClick__?: Function; //internal only
}

export default function AccordionPanel(props: PanelProps) {
    const {
        header,
        children,
        className,
        __key__,
        __onHeaderClick__,
        ...otherProps
    } = props;
    const handleHeaderClick = () => {
        handleFuncProp(__onHeaderClick__)(__key__);
    };
    const style: React.CSSProperties = {};

    if (__onHeaderClick__) style.cursor = "pointer";

    return (
        <AccordionContext.Consumer>
            {
                context => (
                    <div className={classNames(className, "card")} {...otherProps}>
                        <div
                            style={style}
                            className="card-header"
                            onClick={handleHeaderClick}>{header}</div>
                        <Collapse isOpen={context.has(__key__)}>
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