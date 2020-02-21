import * as React from "react";
import PropTypes from "prop-types";
import { classNames, handleFuncProp } from "../utils";
import Fade from "../Fade";
import { TabContext } from "../contexts";

export interface TabPaneProps extends React.HTMLAttributes<HTMLElement> {
    tab?: string | React.ReactNode;
    tabProps?: React.HTMLAttributes<HTMLElement>;
    disabled?: boolean;
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
        handleFuncProp(onHidden)();
    };

    delete otherProps.tab;
    delete otherProps.disabled;
    delete otherProps.tabProps;

    return (
        <TabContext.Consumer>
            {
                ({
                    activeKey: a,
                    previousKey: p,
                    fade
                }) => {
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