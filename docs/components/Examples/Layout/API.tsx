import * as React from "react";
import PropsTable from "../../PropsTable";
import DocHeading from "../../DocHeading";

const ContainerProps = [{
    name: "variant",
    type: `"fluid" | "sm" | "md" | "lg" | 'xl'`,
    description: "For a full width container, spanning the entire width of the viewport(fluid) or specify a class that is 100% wide until the specified breakpoint is reached"
}];
const RowProps = [{
    name: "noGutters",
    type: "boolean",
    default: "false",
    description: "Removes the negative margins and the horizontal padding from all immediate children columns"
}, {
    name: "alignment",
    type: `"start" | "center" | "end"`,
    description: "Vertical alignment of columns(align-items of flexbox)"
}, {
    name: "justify",
    type: `"start" | "center" | "end" | "around" | "between"`,
    description: "Horizontal alignment of columns(justify-content of flexbox)"
}, {
    name: "form",
    type: "boolean",
    default: "false",
    description: "For form rows"
}, {
    name: "cols",
    type: "number | object({default?: number, sm?: number, md?: number, lg?: number, xl?: number})",
    description: "Set the number of columns that best render your content and layout"
}];
const breakpoint = `number | boolean | "auto" | object({span?: "auto" | boolean | number, offset?: number, order?: number})`
const ColProps = [{
    name: "alignment",
    type: `"start" | "center" | "end"`,
    description: "Vertical alignment of columns(align-self of flexbox)"
}, {
    name: "span",
    type: `number | "auto" | boolean`,
    default: "true",
    description: "Set the width of the column(apply 'col[-span]' classes)"
}, {
    name: "order",
    type: "number",
    description: "Order of the column"
}, {
    name: "Offset",
    type: "number",
    description: "Offset of the column"
}, {
    name: "Offset",
    type: "number",
    description: "Offset of the column"
}, {
    name: "sm",
    type: breakpoint,
    description: "For small devices (≥576px)"
}, {
    name: "md",
    type: breakpoint,
    description: "For medium devices (≥576px)"
}, {
    name: "lg",
    type: breakpoint,
    description: "For large devices (≥576px)"
}, {
    name: "xl",
    type: breakpoint,
    description: "For extra large devices (≥576px)"
}];

export default () => (
    <>
        <DocHeading>API</DocHeading>
        <PropsTable title="Container" data={ContainerProps} />
        <PropsTable title="Row" data={RowProps} />
        <PropsTable title="Col" data={ColProps} />
    </>
);