import * as React from "react";

export default {
    compDesc: "一个灵活的强大的展示一系列内容的组件。可以通过修改和扩展来展示任何内容。",
    basicTitle: "基础示例",
    aodTitle: "激活或者禁用",
    aodDesc: <>设置<code>active/disabled</code>属性来激活/禁用选项。</>,
    actionTitle: "Action",
    actionDesc: <>列表项可以渲染成<code>button</code>或者<code>a</code>元素（取决于是否设置了<code>href</code>属性）。</>,
    flushTitle: "Flush",
    flushDesc: <>设置<code>flush</code>属性来移除一些边框和圆角，使列表组的选项紧挨父容器的边框（如： 卡片）。</>,
    horizontalTitle: "水平列表组",
    horizontalDesc: (
        <>
            <p>
                设置<code>horizontal</code>属性将列表组有竖直排列改为水平排列。可以选择一个响应式断点(设置<code>minWidth: sm | md | lg | xl</code>)，使列表组的水平排列起始于断点的min-width的值。目前水平列表组不能与flush结合使用。
            </p>
            提示: 需要水平列表组选项等宽? 给列表组设置<code>equalWith</code>属性。
        </>
    ),
    ccTitle: "列表组样式",
    ccDesc: <>设置<code>variant</code>属性，给列表项添加背景色和字体颜色。</>,
    ccDesc2: "也可以跟action一起使用。也支持激活的状态。",
    tabTitle: "标签页",
    horizontalApi: "使列表项水平排列",
    flushApi: "移除一些边框使列表组的变紧挨父容器",
    minWidthApi: "使列表组的水平排列起始于断点的min-width的值,如horizontal为false将会被忽略",
    equalWithApi: "设置水平等宽的列表项",
    activeApi: "激活列表项",
    disabledApi: "禁用列表项",
    actionApi: "创建可操作（鼠标悬浮、禁用和激活状态）的列表项",
    variantApi: "设置选项的背景色和颜色",
    hrefApi: <>渲染成<code>a</code>元素</>
}