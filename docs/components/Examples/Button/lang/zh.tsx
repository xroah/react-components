import * as React from "react";

export default {
    compDesc: "在表单、对话框等当中使用，支持多种尺寸、状态等。",
    egTitle: "示例",
    egDesc: <><code>Button</code>包含多种预定义的样式。</>,
    obTitle: "轮廓按钮",
    obDesc: <>设置 <code>outline</code>属性来移除所有按钮的背景颜色。</>,
    sizeTitle: "按钮尺寸",
    sizeDesc: <>设置<code>size="lg"</code> or <code>size="sm"</code>来改变按钮的大小。</>,
    blockDesc: <>通过设置<code>block</code>属性，创建<code>block</code>按钮，使按钮适合父元素宽度。</>,
    asTitle: "激活状态",
    acDesc: <>设置<code>active</code>属性，使按钮变成激活状态（更暗的背景色、边框和内阴影）。</>,
    dsTitle: "禁用状态",
    dsDesc: <>设置<code>disabled</code>属性禁用按钮。</>,
    carTitle: "复选和单选按钮",
    carDesc: (
        <>
            <p>
                <code>Button</code>的样式可以被应用到其他的元素，如<code>label</code>， 变成可切换的按钮. 将按钮放置到<code dangerouslySetInnerHTML={{ __html: `<Button.ToggleGroup/>` }} />中， 使<code>input</code>呈现按钮的样式. 
            </p>
            <code>checked</code>的状态通过点击来更新，需要手动设置<code>active</code>属性。
        </>
    ),
    btnVarApi: "按钮的外观样式",
    sizeApi: "设置按钮的尺寸",
    disabledApi: "禁用按钮",
    btnTypeApi: "按钮的类型",
    blockApi: "使按钮适应父元素的宽度",
    activeApi: "激活按钮",
    hrefApi: <>渲染成<code>a</code>元素, <code>href</code>作为<code>a</code>元素的<code>href</code>属性值</>,
    tgTypeApi: <>按钮内<code>input</code>元素的<code>type</code>属性值得. 该属性值会覆盖<code>Button.ToggleGroup</code>的<code>type</code>属性值</>,
    //button group
    groupDesc: <>将一系列的<code>Button</code>放置在<code>Button.Group</code>中</>,
    tbTitle: "按钮工具栏",
    tbDesc: <>将<code>Button</code>放在<code>Button.Toolbar</code>中创建更复杂的组件</>,
    groupSizeTitle: "按钮组尺寸",
    groupSizeDesc: <>设置<code>Button.Group</code>的尺寸来改变子按钮的尺寸。</>,
    nestingTitle: "嵌套",
    nestingDesc: <>将<code>Button.Group</code>嵌套在另一个<code>Button.Group</code>中（如下拉菜单）。</>,
    verticalTitle: "垂直按钮组",
    verticalDesc: "将按钮垂直堆叠在一起",
    groupSizeApi: "设置按钮组的尺寸",
    verticalApi: "使按钮垂直摆放",
    tgGroupTypeApi: <>该组件内<code>input</code>元素的类型</>
};