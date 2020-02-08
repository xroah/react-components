import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";

const CollapseProps = [{
    name: "isOpen",
    type: "boolean",
    description: "Control opened/closed state"
}, {
    name: "onShow",
    type: "Function",
    description: "Callback when the collapse starts showing"
}, {
    name: "onShown",
    type: "Function",
    description: "Callback when the collapse has been visible"
}, {
    name: "onHide",
    type: "Function",
    description: "Callback when the collapse starts hiding"
}, {
    name: "onHidden",
    type: "Function",
    description: "Callback when collapse has been hidden"
}];
const AccordionProps = [{
    name: "activeKey",
    type: "string | number | string[] | number[]",
    description: "Key of the active panel"
}, {
    name: "defaultActiveKey",
    type: "string | number | string[] | number[]",
    description: "Key of the initial active panel"
}, {
    name: "multiple",
    type: "boolean",
    default: "false",
    description: "Enable to activate multiple panels or not"
}];
const PanelProps = [{
    name: "key",
    type: "string | number",
    description: "Unique key for identifying the panel"
}, {
    name: "header",
    type: "string | ReactNode",
    description: "Header of the panel"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Collapse" data={CollapseProps} />
        <PropsTable title="Accordion" data={AccordionProps} />
        <PropsTable title="Accordion.Panel" data={PanelProps} />
    </>
);