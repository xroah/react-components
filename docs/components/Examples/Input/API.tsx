import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
import NoAPI from "../../NoAPI";

const InputProps = [{
    name: "type",
    type: "string",
    default: "text",
    description: "Type of input element, if variant is textarea, it will be ignored"
}, {
    name: "prepend",
    type: "string | ReactNode",
    description: "A add-on on left side"
}, {
    name: "append",
    type: "string | ReactNode",
    description: "A add-on on right side"
}, {
    name: "sizing",
    type: "lg | sm",
    description: "Size of the input, distinguish from the size attribute of input element"
}, {
    name: "variant",
    type: "input | textarea",
    default: "input",
    description: "Render as input or textarea"
}, {
    name: "plaintext",
    type: "boolean",
    default: "false",
    description: "Style the read-only input as plaintext"
}];
const GroupProps = [{
    name: "size",
    type: "lg | sm",
    description: "Size of input group"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Input" data={InputProps} />
        <PropsTable title="Input.Group" data={GroupProps} />
        <NoAPI title="Input.Text"/>
    </>
);