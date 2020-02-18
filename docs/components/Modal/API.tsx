import * as React from "react";
import PropsTable from "../PropsTable";
import DocHeading from "../DocHeading";

const props = [{
    name: "visible",
    type: "boolean",
    default: "false",
    description: "Visibility of the modal"
}, {
    name: "titleText",
    type: "string | ReactNode",
    description: "Title text of the modal"
}, {
    name: "closable",
    type: "boolean",
    default: "true",
    description: "Show close button on the header"
}, {
    name: "showOk",
    type: "boolean",
    default: "true",
    description: "Show ok button on the footer"
}, {
    name: "showCancel",
    type: "boolean",
    default: "true",
    description: "Show cancel button on the footer"
}, {
    name: "okText",
    type: "string | ReactNode",
    default: "确定",
    description: "Text of ok button"
}, {
    name: "cancelText",
    type: "string | ReactNode",
    default: "取消",
    description: "Text of cancel button"
}, {
    name: "keyboard",
    type: "boolean",
    default: "true",
    description: "Enable close the modal by pressing esc key"
}, {
    name: "forceRender",
    type: "boolean",
    default: "false",
    description: "If true will render the modal just mounted, otherwise will render it when visible is true"
}, {
    name: "fade",
    type: "boolean",
    default: "true",
    description: "Enable fade animation when the modal is opening or closing"
}, {
    name: "centered",
    type: "boolean",
    default: "false",
    description: "Vertically center the modal"
}, {
    name: "size",
    type: "xl | lg | sm",
    description: "Size of the modal"
}, {
    name: "autoFocus",
    type: "boolean",
    default: "true",
    description: "Puts the focus on the modal when shown."
}, {
    name: "scrollable",
    type: "boolean",
    default: "false",
    description: "Allow scroll the modal body"
}, {
    name: "backdrop",
    type: "boolean | 'static'",
    default: "true",
    description: "Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click."
}, {
    name: "header",
    type: "string | ReactNode",
    description: "Customize the header, if null will not render the header"
}, {
    name: "footer",
    type: "string | ReactNode",
    description: "Customize the footer, if null will not render the footer"
}, {
    name: "onOk",
    type: "Function(e)",
    description: "Callback is invoked when ok button is clicked"
}, {
    name: "onCancel",
    type: "Function(e)",
    description: "Callback is invoked when cancel button is clicked"
}, {
    name: "onShow",
    type: "Function()",
    description: "Callback is invoked when visible changes from false to true"
}, {
    name: "onShown",
    type: "Function()",
    description: "Callback is invoked when the modal has been shown"
}, {
    name: "onHide",
    type: "Function()",
    description: "Callback is invoked when visible changes from true to false"
}, {
    name: "onHidden",
    type: "Function()",
    description: "Callback is invoked when the modal has been hidden"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Modal" data={props}/>
    </>
);