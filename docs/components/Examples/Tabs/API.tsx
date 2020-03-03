import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";

const TabProps = [{
    name: "activeKey",
    type: "string",
    description: "The key of the active tab(controlled component)"
}, {
    name: "defaultActiveKey",
    type: "string",
    description: "Initial key of the active tab(if both defaultActiveKey and activeKey are not passed, the first will be activated)"
}, {
    name: "pill",
    type: "boolean",
    default: "false",
    description: "Style as pills"
}, {
    name: "fade",
    type: "boolean",
    default: "true",
    description: "Enable fade animation when tab switches"
}, {
    name: "onTabChange",
    type: "Function(prevKey, currentKey)",
    description: "Callback when tabs change"
}, {
    name: "onTabClick",
    type: "Function(key, e)",
    description: "Callback when a tab is clicked(tab prop of TabPane must not be empty)"
}];
const TabPaneProps = [{
    name: "tab",
    type: "string | ReactNode",
    description: "Title of the TabPane"
}, {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disable the TabPane"
}, {
    name: "key",
    type: "string | number",
    description: "A unique key for identifying the TabPane"
}]

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Tabs" data={TabProps}/>
        <PropsTable title="Tabs.TabPane" data={TabPaneProps}/>
    </>
);