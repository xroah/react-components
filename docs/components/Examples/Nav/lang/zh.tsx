import * as React from "react"

export default {
    compDesc: "导航组件",
    baseTitle: "基础导航",
    baseDesc: (
        <>
            导航组建支持基础、激活和禁用状态。基础<code>Nav</code>组件是使用flexbox创建并且提供一个强大的建立各种类型导航的基础。
            <div className="bd-callout-info">
                基础的<code>Nav</code>组件不包含任何的激活状态。下面的示例包含active属性，主要是用来演示这个属性不会应用任何特殊的样式。
            </div>
        </>
    ),
    stylesTitle: "样式",
    haTitle: "水平排列",
    haDesc: <>导航默认左对齐，可以通过设置<code>alignment</code>属性来改成居中或者右对齐。</>,
    verticalTitle: "垂直排列",
    verticalDesc: <>设置<code>vertical</code>属性，使导航垂直排列。如果希望只在某些视口下垂直排列，设置<code>minWidth</code>属性(如: <code>sm</code>).</>,
    tabsTitle: "标签页",
    tabsDesc: <>设置<code>variant="tab"</code>创建标签页导航。(需要使用<code>Nav.Item</code>组件来清除激活的标签页的下边框。)。使用<code>Tabs</code>组件来创建标签页。</>,
    pillsTitle: "胶囊导航",
    pillsDesc: <>设置<code>variant="pill"</code></>,
    fillTitle: "填充和对齐",
    fillDesc: <>使内容填满整个可用空间。设置<code>fill</code>属性，使<code>Nav.Item</code>按比例填充可用空间。注：整个水平空间都被占用但不是每个导航项都是等宽的。</>,
    justifyDesc: <>设置<code>equalWidth</code>属性使得每个导航项等宽。所有的水平空间都会被占用，与上例不一样的是，每个导航项宽度都是相等的。</>,
    dropdownTitle: "使用下拉菜单",
    dropdownDesc: <><div>需要使用<code>Nav.Item</code>来创建额外的样式。</div></>,
    tabsDropdownTitle: "标签页中的下拉菜单",
    pollsDropdownTitle: "胶囊导航中的下拉菜单",
    variantApi: "标签页或胶囊导航",
    verticalApi: "使当行水平排列",
    minWidthApi: "在某些视口中水平排列",
    alignmentApi: "设置水平的排列方式",
    fillApi: "填充整个可用空间",
    equalWidthApi: "等宽的导航项",
    activeApi: "激活导航链接",
    disabledApi: "禁用导航链接",
    hrefApi: <>组件内<code>a</code>元素的href属性。</>
}