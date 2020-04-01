import * as React from "react";

export default {
    compDesc: "List groups are a flexible and powerful component for displaying a series of content. Modify and extend them to support just about any content within.",
    basicTitle: "Basic example",
    aodTitle: "Active or disabled",
    aodDesc: <>Set the <code>active/disabled</code> prop to activate/disable the selection.</>,
    actionTitle: "Action",
    actionDesc: <>List item actions will render as a <code>button</code> or <code>a</code>(depends on the presence of an <code>href</code>)</>,
    flushTitle: "Flush",
    flushDesc: <>Set <code>flush</code> prop to remove some borders and rounded corners to render list group items edge-to-edge in a parent container (e.g., cards).</>,
    horizontalTitle: "Horizontal",
    horizontalDesc: (
        <>
            <p>
                Set <code>horizontal</code> prop to change the layout of list group items from vertical to horizontal across all breakpoints. Alternatively, choose a responsive variant(<code>minWidth: sm | md | lg | xl</code>) to make a list group horizontal starting at that breakpoint’s min-width. Currently horizontal list groups cannot be combined with flush list groups.
            </p>
            ProTip: Want equal-width list group items when horizontal? Set <code>equalWith</code> prop to list group.
        </>
    ),
    ccTitle: "Contextual classes",
    ccDesc: <>Use <code>variant</code> prop to style list items with a stateful background and color.</>,
    ccDesc2: "Contextual classes also work with action.Also supported is the active state， apply it to indicate an active selection on a contextual list group item.",
    tabTitle: "Tabbable panes",
    horizontalApi: "Change the layout of list group items from vertical to horizontal",
    flushApi: "Remove some borders and rounded corners to render list group items edge-to-edge in a parent container",
    minWidthApi: "Make a list group horizontal starting at that breakpoint’s min-width, it will be ignored if horizontal is false",
    equalWithApi: "Equal-width list group items when horizontal",
    activeApi: "Activate the item",
    disabledApi: "Disable the item",
    actionApi: "Create actionable list group items with hover, disabled, and active states",
    variantApi: "Set contextual classes for the item",
    hrefApi: <>Render the item as <code>a</code> element with the <code>href</code> attribute</>
}