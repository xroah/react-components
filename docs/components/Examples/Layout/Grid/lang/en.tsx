import * as React from "react";

export default {
    gridTitle: "Grid",
    gridDesc: "Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive.",
    equalTitle: "Equal-width",
    equalDesc: <>For example, here are two grid layouts that apply to every device and viewport, from <code>xs</code> to <code>xl</code>. Add any number of unit-less props for each breakpoint you need and every column will be the same width.</>,
    oneColWidthTitle: "Setting one column width",
    oneColWidthDesc: "Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it.  Note that the other columns will resize no matter the width of the center column.",
    variableContentTitle: "Variable width content",
    variableContentDesc: <>Use <code dangerouslySetInnerHTML={{ __html: `{breakpoint}="auto"` }} /> props to size columns based on the natural width of their content.</>,
    mixTitle: "Mix and match",
    mixDesc: "Don’t want your columns to simply stack in some grid tiers? Use a combination of different props for each tier as needed. See the example below for a better idea of how it all works.",
    rowColTitle: "Row columns",
    rowColDesc: (
        <>
            <p>
                Use the responsive <code>cols</code> prop to quickly set the number of columns that best render your content and layout.
            </p>
            Use these row columns prop to quickly create basic grid layouts or to control your card layouts.
        </>
    ),
    alignmentTitle: "Alignment",
    alignmentDesc: <>Use <code>alignment</code> prop to vertically and <code>justify</code> to horizontally align columns.</>,
    verticalTitle: "Vertical alignment",
    noGuttersTitle: "No gutters",
    noGuttersDesc: <>The gutters between columns in our predefined grid classes can be removed with <code>noGutters</code> prop. This removes the negative margins from <code>Row</code> and the horizontal padding from all immediate children columns.</>,
    horizontalTitle: "Horizontal alignment",
    reorderingTitle: "Reordering",
    reorderingDesc: <>Use <code>order</code> props for controlling the visual order of your content. These classes are responsive, so you can set the order by breakpoint (e.g., <code dangerouslySetInnerHTML={{ __html: '<Col order={1} md={{order: 2}}/>' }} />). Includes support for 1 through 12 across all five grid tiers.</>,
    offsetTitle: "Offset",
    offsetDesc: "You can offset grid columns in two ways: our responsive offset props and our margin utilities."
}