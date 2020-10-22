import * as React from "react"

export default {
    compDesc: "Examples and usage guidelines for form control styles, layout options, and custom components for creating a wide variety of forms.",
    gridTitle: "Form grid",
    gridDesc: "More complex forms can be built using our grid components.",
    rowTitle: "Form row",
    rowDesc: <>You may also set <code>form</code> prop for <code>Row</code>, a variation of our standard grid row that overrides the default column gutters for tighter and more compact layouts.</>,
    complexDesc: "More complex layouts can also be created with the grid system.",
    horizontalTitle: "Horizontal form",
    horizontalDesc: <>Create horizontal forms with the grid by adding the <code>horizontal</code> prop, <code>labelCol</code> and <code>wrapperCol</code> to <code>Form</code> or <code>Form.Item</code>.</>,
    inlineTitle: "Inline form",
    inlineDesc:<>Use the <code>inline</code> prop to display a series of labels, form controls, and buttons on a single horizontal row.</>,
    checkboxTitle: "Checkboxes",
    indeterminateDesc: <>Custom checkboxes can also utilize the <code>:indeterminate</code> pseudo class when manually set via JavaScript (there is no available HTML attribute for specifying it).</>,
    radioTitle: "Radios",
    switchTitle: "Switches",
    inlineApi: "Display the series of labels, form controls, and buttons on a single horizontal row",
    labelColApi: <>Same as props of <code>Col</code>, wrap the label with <code>Col</code></>,
    wrapperColApi: <>Same as props of <code>Col</code>, wrap the children of <code>Form.Item</code> with <code>Col</code></>,
    horizontalApi: "Create horizontal forms",
    labelAlignApi: "Text alignment of label",
    itemHApi: "Create horizontal form item",
    itemLabelTextApi: "Label text",
    itemLabelApi: <>Wrap the label text with <code>label</code> element or not</>,
    itemLabelColApi: <>Same as props of <code>Col</code>, wrap the label with <code>Col</code>.It will override the labelCol of <code>Form</code></>,
    itemWrapperColApi: <>Same as props of <code>Col</code>, wrap the children of <code>Form.Item</code> with <code>Col</code>. It will override the wrapperCol of <code>Form</code>.</>,
    itemLabelAlignApi: <>Text alignment of label. It will override the labelAlign of <code>Form</code></>,
    htmlForApi: <>Set <code>for</code> for underlying <code>label</code> element</>,
    helpApi: "Help text",
    controlApi: <>Add '<code>form-control</code>' to the className of children</>,
    autoFocusApi: "Auto focus once the component mounted",
    checkedApi: "The component checked or not",
    defaultCheckedApi: "Initial checked of the component",
    disabledApi: "Disable the component",
    onChangeApi: "Fires when checked state changed",
    customInlineApi: "Inline mode",
    noteDesc: <><strong>Note:</strong> The <code>className</code> and <code>style</code> props will pass to the root element of Checkbox, Radio or Switch, other props will pass to the input element.</>
}