import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
import NoAPI from "../../NoAPI";

const AlertProps = [{
    name: "variant",
    type: `"primary" |
        "secondary" |
        "success" |
        "danger" |
        "warning" |
        "info" |
        "dark" |
        "light"`,
    default: "",
    description: "Appearance of a Alert"
}, {
    name: "Fade",
    type: "boolean",
    default: "true",
    description: "Fade when Alert dismiss or appear"
}, {
    name: "visible",
    type: "boolean",
    default: "true",
    description: "Visual state of the Alert."
}, {
    name: "dismissible",
    type: "boolean",
    default: "false",
    description: "Add a dismiss button and adds extra padding to the right of the alert"
}, {
    name: "onClose",
    type: "Function",
    description: "If dismissible is true the callback is invoked immediately once the dismiss button is clicked, otherwise it will be invoked when visible changes from true to false"
}, {
    name: "onClosed",
    type: "Function",
    description: "The callback is invoked when the alert has been dismissed."
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Alert" data={AlertProps} />
        <NoAPI title="Alert.Link" />
    </>
);