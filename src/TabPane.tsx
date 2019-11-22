import * as React from "react";
import PropTypes from "prop-types";
import { classNames, TabContext } from "./utils";

export interface TabPaneProps extends React.HTMLAttributes<HTMLElement> {
    tab: React.ReactNode;
    disabled?: boolean;
    __key__?: string; //internal only
}

export default function TabPane(props: TabPaneProps) {
    const {
        className,
        __key__,
        ...otherProps
    } = props;
    const context = React.useContext(TabContext);

    delete otherProps.tab;
    delete otherProps.disabled;

    return (
        <div className={
            classNames(
                "tab-pane",
                context === __key__ && "active"
            )
        } {...otherProps} />
    );
}

TabPane.propTypes = {
    tab: PropTypes.node.isRequired,
    disabled: PropTypes.bool
};