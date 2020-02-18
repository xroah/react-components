import * as React from "react";
import PropTypes from "prop-types";
import { classNames, handleFuncProp } from "../utils";
import Fade from "../Fade";
import { TabContext } from "../contexts";

export interface TabPaneProps extends React.HTMLAttributes<HTMLElement> {
    tab?: string | React.ReactNode;
    disabled?: boolean;
    action?: boolean;
    panelKey?: string; 
    onHidden?: () => void;
}

export default function TabPane(props: TabPaneProps) {
    const {
        className,
        panelKey,
        onHidden,
        ...otherProps
    } = props;
    const handleExited = () => {
        setTimeout(() => handleFuncProp(onHidden)(), 20);
    };

    delete otherProps.tab;
    delete otherProps.disabled;
    delete otherProps.action;

    return (
        <TabContext.Consumer>
            {
                value => {
                    const {
                        activeKey: a,
                        previousKey: p,
                        fade
                    } = value;
                    const _in = a === panelKey && !p;

                    return (
                        <Fade
                            in={_in}
                            animation={fade}
                            onExited={handleExited}>
                            <div className={
                                classNames(
                                    className,
                                    "tab-pane",
                                    (_in || p === panelKey) && "active"
                                )
                            } {...otherProps} />
                        </Fade>
                    );
                }
            }
        </TabContext.Consumer>
    );
}

TabPane.propTypes = {
    tab: PropTypes.node,
    disabled: PropTypes.bool
};
TabPane.defaultProps = {
    action: true
};