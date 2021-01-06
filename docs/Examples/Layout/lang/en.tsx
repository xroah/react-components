import containerLang from "../Container/lang/en"
import gridLang from "../Grid/lang/en"

export default {
    ...containerLang,
    ...gridLang,
    overviewTitle: "Overview",
    overviewDesc: "Components and options for laying out your project, including wrapping containers, a powerful grid system, a flexible media object, and responsive utility classes.",
    variantApi: "For a full width container, spanning the entire width of the viewport(fluid) or specify a class that is 100% wide until the specified breakpoint is reached",
    noGuttersApi: "Removes the negative margins and the horizontal padding from all immediate children columns",
    rowAlignmentApi: "Vertical alignment of columns(align-items of flexbox)",
    justifyApi: "Horizontal alignment of columns(justify-content of flexbox)",
    formApi: "For form rows",
    colsApi: "Set the number of columns that best render your content and layout",
    colAlignmentApi: "Vertical alignment of columns(align-self of flexbox)",
    spanApi: "Set the width of the column(apply 'col[-span]' classes)",
    orderApi: "Order of the column",
    offsetApi: "Offset of the column",
    smApi: "For small devices (≥576px)",
    mdApi: "For medium devices (≥768px)",
    lgApi: "For large devices (≥992px)",
    xlApi: "For extra large devices (≥1200px)"
}