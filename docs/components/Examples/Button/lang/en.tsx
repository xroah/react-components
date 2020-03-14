import * as React from "react";

export default {
    compDesc: "Use Bootstrap’s custom button styles for actions in forms, dialogs, and more with support for multiple sizes, states, and more.",
    egTitle: "Examples",
    egDesc: "Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control.",
    obTitle: "Outline buttons",
    obDesc: <>In need of a button, but not the hefty background colors they bring? Add <code>outline</code> prop to remove all background images and colors on any button.</>,
    sizeTitle: "Sizes",
    sizeDesc: <>Fancy larger or smaller buttons? Set <code>size="lg"</code> or <code>size="sm"</code> for additional sizes.</>,
    blockDesc: <>Create block level buttons—those that span the full width of a parent—by adding <code>block</code> prop.</>,
    asTitle: "Active state",
    acDesc: <>Buttons will appear pressed (with a darker background, darker border, and inset shadow) when active. You can force the same active appearance with <code>active</code> prop, should you need to replicate the state programmatically.</>,
    dsTitle: "Disabled state",
    dsDesc: <>Make buttons look inactive by adding the disabled boolean prop to any <code>Button</code> component.</>,
    carTitle: "Checkbox and radio buttons",
    carDesc: (
        <>
            <p>
                Bootstrap’s <code>Button</code> styles can be applied to other elements, such as <code>label</code>s, to provide checkbox or radio style button toggling. Add <code dangerouslySetInnerHTML={{ __html: `<Button.ToggleGroup/>` }} /> to style the <code>input</code>s within your buttons. <strong>Note that you can create single input-powered buttons or groups of them</strong>.``
            </p>
            The checked state for these buttons is only updated via click event on the button. You’ll need to toggle <code>active</code> prop manually.
        </>
    ),
    btnVarApi: "Appearance of Button",
    sizeApi: "Specifies the large or small button",
    disabledApi: "Disable the button",
    btnTypeApi: "Button type",
    blockApi: "Spans the full width of the Button parent",
    activeApi: "Activate the button",
    hrefApi: <>Render the button as <code>a</code> element, styled like button</>,
    tgTypeApi: <>Type for underlying <code>input</code> element. If set, the type prop from <code>Button.ToggleGroup</code> will be overrode</>,
    //button group
    groupDesc: <>Wrap a series of <code>Button</code>s with <code>Button.Group</code></>,
    tbTitle: "Button toolbar",
    tbDesc: "Combine sets of button groups into button toolbars for more complex components.",
    groupSizeTitle: "Sizing",
    groupSizeDesc: <>Instead of applying <code>Button</code> sizing prop to every button in a group, just set <code>size</code> prop for <code>Button.Group</code>.</>,
    nestingTitle: "Nesting",
    nestingDesc: <>Place a <code>Button.Group</code> within another <code>Button.Group</code>  when you want dropdown menus mixed with a series of buttons.</>,
    verticalTitle: "vertical",
    verticalDesc: <>Make a set of buttons appear vertically stacked rather than horizontally.
    <strong>Split button dropdowns are not supported here.</strong></>,
    groupSizeApi: "Set the size in the group of Buttons",
    verticalApi: "Make a set of buttons appear vertically stacked rather than horizontally. ",
    tgGroupTypeApi: <>Type for underlying <code>input</code> of <code>Button.Toggle</code></>
};