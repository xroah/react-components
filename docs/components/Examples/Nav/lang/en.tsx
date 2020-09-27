import * as React from "react"

export default {
    compDesc: "Documentation and examples for how to use Bootstrap’s included navigation components.",
    baseTitle: "Base nav",
    baseDesc: (
        <>
            Navigation available in Bootstrap share general markup and styles, from the base <code>Nav</code> to the active and disabled states.
            The base <code>Nav</code> component is built with flexbox and provide a strong foundation for building all types of navigation components.
            <div className="bd-callout-info">
                The base <code>Nav</code> component does not include any active state. The following examples include the active prop, mainly to demonstrate that this particular prop does not trigger any special styling.
            </div>
        </>
    ),
    stylesTitle: "Available styles",
    haTitle: "Horizontal alignment",
    haDesc: <>Change the horizontal alignment of your nav with <code>alignment</code> prop. By default, navs are left-aligned, but you can easily change them to center or right aligned.</>,
    verticalTitle: "Vertical",
    verticalDesc: <>Stack your navigation by changing the flex item direction with the <code>vertical</code> prop. Need to stack them on some viewports but not others? Use the responsive <code>minWidth</code> prop (e.g., <code>sm</code>).</>,
    tabsTitle: "Tabs",
    tabsDesc: <>Takes the basic nav from above and set <code>variant="tab"</code> to generate a tabbed interface(you should use <code>Nav.Item</code> to clear border-bottom when the tab is active). Use them to create tabbable regions with our <code>Tabs</code> component.</>,
    pillsTitle: "Pills",
    pillsDesc: <>Use <code>variant="pill"</code> instead.</>,
    fillTitle: "Fill and justify",
    fillDesc: <>Force your contents to extend the full available width. To proportionately fill all available space with your <code>Nav.Item</code>, use <code>fill</code> prop. Notice that all horizontal space is occupied, but not every nav item has the same width.</>,
    justifyDesc: <>For equal-width elements, use <code>equalWidth</code> prop. All horizontal space will be occupied, but unlike the fill above, every nav item will be the same width.</>,
    dropdownTitle: "Using dropdowns",
    dropdownDesc: <><div>You should use with <code>Nav.Item</code> for some extra styles.</div></>,
    tabsDropdownTitle: "Tabs with dropdowns",
    pollsDropdownTitle: "Pills with dropdowns",
    variantApi: "Style as tab or pill",
    verticalApi: "Stack your navigation vertically",
    minWidthApi: "Stack them vertically on some viewports but not others",
    alignmentApi: "Change the horizontal alignment of nav",
    fillApi: "Fill the full available width",
    equalWidthApi: "Equal-width elements",
    activeApi: "Activate the link",
    disabledApi: "Disable the link",
    hrefApi: <>Attribute for underlying <code>a</code> element</>
}