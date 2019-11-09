import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Collapse from "./Collapse";
import {handleFuncProp} from "./utils";
import {AccordionContext} from "./utils";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
    header: React.ReactNode;
    __index__?: number; //internal only
    __onHeaderClick__?: Function; //internal only
}

export default class AccordionPanel extends React.Component<PanelProps> {

    static propTypes = {
        header: PropTypes.node.isRequired
    };
    static contextType = AccordionContext;

    handleHeaderClick = () => {
        const {
            __index__,
            __onHeaderClick__
        } = this.props;
        const fn = handleFuncProp(__onHeaderClick__);

        fn(__index__);
    };

    render() {
        const {
            header,
            children,
            className,
            __index__,
            ...otherProps
        } = this.props;

        delete otherProps.__onHeaderClick__;

        return (
            <div className={classNames(className, "card")} {...otherProps}>
                <div
                    style={{cursor: "pointer"}}
                    className="card-header"
                    onClick={this.handleHeaderClick}>{header}</div>
                <Collapse isOpen={this.context.has(__index__)}>
                    {children}
                </Collapse>
            </div>
        );
    }

}