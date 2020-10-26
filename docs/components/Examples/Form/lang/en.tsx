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
    validationTitle: "Validation",
    validationDesc: (
        <>
            <div>
                Provide valuable, actionable feedback to your users with HTML5 form validation–<a href="https://caniuse.com/#feat=form-validation">available in all our supported browsers</a>. Choose from the browser default validation feedback, or implement custom messages with our built-in classes and starter JavaScript
            </div>
            <div className="bd-callout bd-callout-warning">
                We currently recommend using custom validation styles, as native browser default validation messages are not consistently exposed to assistive technologies in all browsers (most notably, Chrome on desktop and mobile)
            </div> 
        </>
    ),
    customStylesTitle: "Custom styles",
    customStylesDesc: (
        <>
            <p>
                    For custom Bootstrap form validation messages, you’ll need to add the <code>novalidate</code> boolean attribute to <code>Form</code>. This disables the browser default feedback tooltips, but still provides access to the form validation APIs in JavaScript. Try to submit the form below; our JavaScript will intercept the submit button and relay feedback to you. When attempting to submit, you’ll see the <code>:invalid</code> and <code>:valid</code> styles applied to your form controls
               </p>
                <p>
                    Custom feedback styles apply custom colors, borders, focus styles, and background icons to better communicate feedback. Background icons for <code>&lt;select&gt;</code>s are only available with <code>.custom-select</code>, and not <code>.form-control</code>
                </p>
        </>
    ),
    browserDefaultTitle: "Browser default",
    browserDefaultDesc: (
        <>
            <p>
                    Not interested in custom validation feedback messages or writing JavaScript to change form behaviors? All good, you can use the browser defaults. Try submitting the form below. Depending on your browser and OS, you’ll see a slightly different style of feedback
                </p>
                <p>
                    While these feedback styles cannot be styled with CSS, you can still customize the feedback text through JavaScript
                </p>
        </>
    ),
    tooltipsTitle: "Tooltips",
    tooltipsDesc: <>If your form layout allows it, you can set <code>validationTooltip</code> to display validation feedback in a styled tooltip. Be sure to have a parent with <code>position: relative</code> on it for tooltip positioning. In the example below, our column components have this already, but your project may require an alternative setup</>,
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
    validFeedbackApi: "Validation success message",
    invalidFeedbackApi: "Validation failure message",
    validationTooltipApi: "Display validation feedback in a styled tooltip.",
    formItemNote: <><strong>Note:</strong>If the children of <code>Form.Item</code> are custom components, you may need handle <code>help</code>, <code>validFeedback</code> and <code>invalidFeedback</code> props manually</>,
    autoFocusApi: "Auto focus once the component mounted",
    checkedApi: "The component checked or not",
    defaultCheckedApi: "Initial checked of the component",
    disabledApi: "Disable the component",
    onChangeApi: "Fires when checked state changed",
    customInlineApi: "Inline mode",
    noteDesc: <><strong>Note:</strong> The <code>className</code> and <code>style</code> props will pass to the root element of Checkbox, Radio or Switch, other props will pass to the input element.</>
}