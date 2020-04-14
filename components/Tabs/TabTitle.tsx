import * as React from "react";
import Nav from "../Nav";
import { TabContext } from "../Common/contexts";

interface TabTitleProps {
    itemKey?: string;
    onClick: (key?: string, evt?: React.MouseEvent) => void;
    children: React.ReactChild;
    disabled?: boolean;
}

export default function TabTitle(props: TabTitleProps) {
    const {
        onClick,
        itemKey,
        disabled,
        children,
        ...otherProps
    } = props;

    const handleClick = (evt: React.MouseEvent) => {
        !disabled && onClick(itemKey, evt);
        evt.preventDefault();
    };

    return (
        <TabContext.Consumer>
            {
                value => (
                    <Nav.Link
                        active={value.activeKey === itemKey}
                        disabled={disabled}
                        href="#"
                        onClick={handleClick}
                        {...otherProps}>
                        {children}
                    </Nav.Link>
                )
            }
        </TabContext.Consumer>
    );
}