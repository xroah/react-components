import * as React from "react"

export default {
    gridTitle: "网格",
    gridDesc: "网格系统使用容器、行以及列来布局和排列内容。使用flexbox创建，是完全响应式的。",
    equalTitle: "等宽",
    equalDesc: <>例如，以下是两个网格布局，将会应用到每个设备和视口，从<code>xs</code>到<code>xl</code>. 根据需要给每个断点添加无单位的属性，每列的宽度将会相等。</>,
    oneColWidthTitle: "设置一列的宽度",
    oneColWidthDesc: "自动布局的flexbox网格列，意味着可以设置其中一列的宽度，兄弟列将会自动改变宽度。无论中间的列多宽其余的列都会自动改变宽度。",
    variableContentTitle: "可变宽度的内容",
    variableContentDesc: <>设置<code dangerouslySetInnerHTML={{ __html: "{breakpoint}=\"auto\"" }} />，使列宽基于他们的内容设置。</>,
    mixTitle: "混合和适应",
    mixDesc: "不希望列只是简单的堆叠在网格内？根据需要结合不同的属性使用。如下例所示：",
    rowColTitle: "每行列数",
    rowColDesc: (
        <>
            <p>
                使用响应式的<code>cols</code>属性快速设置列数，渲染最佳布局。
            </p>
            使用列数来快速创建基础的布局或者控制卡片布局。
        </>
    ),
    alignmentTitle: "排列方式",
    alignmentDesc: <>使用<code>alignment</code>属性使列垂直排列和<code>justify</code>水平排列。</>,
    verticalTitle: "垂直排列",
    noGuttersTitle: "无间隔",
    noGuttersDesc: <>列之间的间隔可以通过<code>noGutters</code>属性移除。 这将会移除<code>Row</code>的负外边距和直接子列的水平内边距。</>,
    horizontalTitle: "水平排列",
    reorderingTitle: "重新排序",
    reorderingDesc: <>使用<code>order</code>属性控制内容视觉上的排序。这些类都是响应时的，所以可以通过断点设置顺序(如<code dangerouslySetInnerHTML={{ __html: "<Col order={1} md={{order: 2}}/>" }} />)。支持从1到12的五个网格等级。</>,
    offsetTitle: "偏移",
    offsetDesc: "设置网格的偏移有两种方法：响应式的偏移属性和外边工具。"
}