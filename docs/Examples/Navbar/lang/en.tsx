import * as React from "react"

export default {
    compDesc: "A powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for our collapse plugin.",
    egTitle: "Example",
    egDesc: <>Here’s an example of all the sub-components included in a responsive light-themed navbar that automatically collapses at the <code>lg</code> (large) breakpoint.</>,
    supportedTitle: "Supported content",
    brandTitle: "Brand",
    brandDesc: <>The <code>Navbar.Brand</code> can be applied to most elements, but an anchor works best as some elements might require utility classes or custom styles.</>,
    brandDesc2: <>Adding images to the <code>Navbar.Brand</code> will likely always require custom styles or utilities to properly size. Here are some examples to demonstrate.</>,
    textTitle: "Text",
    textDesc: <>Navbars may contain bits of text with the help of <code>Navbar.Text</code>.</>,
    colorTitle: "Color schemes",
    colorDesc: <>Theming the navbar has never been easier thanks to the combination of theming prop. Choose from <code>variant="light"</code> for use with light theme colors, or <code>variant="dark"</code> for dark theme colors.</>,
    resTitle: "Responsive behaviors",
    resDesc: (
        <>
            <p>
                Navbars can utilize <code>Navbar.Toggle</code>, <code>Navbar.Collapse</code>, and <code>expand(sm | md | lg | xl)</code> prop to change when their content collapses behind a button. In combination with other utilities, you can easily choose when to show or hide particular elements.
            </p>
            For navbars that never collapse, set <code dangerouslySetInnerHTML={{ __html: "expand={true}" }}></code> on the navbar. For navbars that always collapse, set <code dangerouslySetInnerHTML={{ __html: "expand={false}" }}></code> or pass nothing.
        </>
    ),
    togglerTitle: "Toggler",
    toggleDesc: (
        <>
            <p>
                Navbar togglers are left-aligned by default, but should they follow a sibling element like a <code>Navbar.Brand</code>, they’ll automatically be aligned to the far right. Reversing your markup will reverse the placement of the toggler. Below are examples of different toggle styles.
            </p>
            With no <code>Navbar.Brand</code> shown in lowest breakpoint:
        </>
    ),
    lgDesc: "With a toggler on the left and brand name on the right:",
    rgDesc: "With a brand name shown on the left and toggler on the right:",
    externalTitle: "External content",
    externalDesc: <>Sometimes you want to use the collapse plugin to trigger hidden content elsewhere on the page. Use <code>Collapse</code>, that’s easily done!</>,
    variantApi: "Light or dark theme",
    bgApi: "Background color of navbar",
    expandApi: "The breakpoint to change when their content collapses behind a button",
    tagApi: "Set a custom element for this component.",
    hrefApi: "Href for underlying a element",
    seeDesc: "see",
    onClickApi: "Callback when toggle button is clicked"
}