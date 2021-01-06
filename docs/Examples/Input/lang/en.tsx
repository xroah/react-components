import * as React from "react"

export default {
    compDesc: "Easily extend form controls by adding text, buttons, or button groups on either side of textual inputs, custom selects, and custom file inputs.",
    basicTitle: "Basic example",
    basicDesc: <>Place one addon or button on either side of an input. You may also place one on both sides of an input. Remember to place <code>label</code> outside the input group.</>,
    readonlyTitle: "Readonly",
    readonlyDesc: <>Add the <code>readonly</code> boolean prop on an input to prevent modification of the input’s value. Read-only inputs appear lighter (just like disabled inputs), but retain the standard cursor.</>,
    plainTitle: "Readonly plain text",
    plainDesc: <>If you want to have <code>readonly</code> elements in your form styled as plain text, use the <code>plainText</code> prop to remove the default form field styling and preserve the correct margin and padding.</>,
    sizingTitle: "Sizing",
    sizingDesc: <>Add the relative form sizing prop to <code>Input.Group</code>(if pass the <code>prepend</code> or <code>append</code> , the input will wrapped by <code>Input.Group</code>) itself and contents within will automatically resize—no need for repeating the size prop on each element.</>,
    multiInputsTitle: "Multiple inputs",
    multiInputsDesc: <>While multiple <code>&lt;input&gt;</code>s are supported visually, validation styles are only available for input groups with a single <code>&lt;input&gt;</code>.</>,
    multiAddonsTitle: "Multiple addons",
    multiAddonsDesc: "Multiple add-ons are supported and can be mixed with checkbox and radio input versions.",
    btnTitle: "Button addons",
    dropdownTitle: "Buttons with dropdowns",
    typeApi: "Type of input element, if variant is textarea, it will be ignored",
    prependApi: "An addon on left side",
    appendApi: "An addon on right side",
    sizingApi: "Size of the input, distinguish from the size attribute of input element",
    variantApi: "Render as input or textarea",
    plainTextApi: "Style the read-only input as plaintext",
    groupSizeApi: "Size of input group"
}