import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";
import NoAPI from "../../NoAPI";

const ButtonGroupProps = [{
    name: "size",
    type: `"sm" | "lg"`,
    description: "Set the size in the group of Buttons"
}, {
    name: "vertical",
    type: "boolean",
    default: "false",
    description: "Make a set of buttons appear vertically stacked rather than horizontally. "
}];
const ToggleGroupProps = [{
    name: "type",
    type: `"checkbox" | "radio"`,
    description: "Type for underlying input of Button.Toggle"
}];

export default () => (
    <>
        <PropsTable title="Button.Group" data={ButtonGroupProps} />
        <PropsTable title="Button.ToggleGroup" data={ToggleGroupProps} />
        <NoAPI title="Button.Toolbar" />
    </>
);