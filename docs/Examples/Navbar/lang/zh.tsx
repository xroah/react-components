import * as React from "react"

export default {
    compDesc: "强大的响应式导航头部，支持商标、导航、折叠插件等。",
    egTitle: "示例",
    egDesc: <>下面的响应式light主题的导航条包含所有子组件， 在<code>lg</code>断点下将会折叠。</>,
    supportedTitle: "支持的内容",
    brandTitle: "商标",
    brandDesc: <><code>Navbar.Brand</code>可以应用到大部分元素，但是<code>a</code>元素比其他一元素更适合。</>,
    brandDesc2: <>在<code>Navbar.Brand</code>中添加图像。</>,
    textTitle: "文本",
    textDesc: <>导航条可以包含帮助文本， 使用<code>Navbar.Text</code>。</>,
    colorTitle: "颜色",
    colorDesc: <>设置<code>variant="light"</code>创建light主题， 或者设置 <code>variant="dark"</code>创建dark主题。</>,
    resTitle: "响应式导航条",
    resDesc: (
        <>
            <p>
                导航条可以使用<code>Navbar.Toggle</code>, <code>Navbar.Collapse</code>和<code>expand(sm | md | lg | xl)</code>属性来改变，当内容在按钮后折叠时。结合其他工具可以简单的选择何时显示或者隐藏元苏俄
            </p>
            如不希望导航条折叠， 设置<code dangerouslySetInnerHTML={{ __html: "expand={true}" }}></code>。如希望总是折叠，For navbars that always collapse, 设置<code dangerouslySetInnerHTML={{ __html: "expand={false}" }}></code>或者不设置<code>expand</code>属性。
        </>
    ),
    togglerTitle: "切换器",
    toggleDesc: (
        <>
            <p>
                默认切换器是作对齐的，但是它们会跟随兄弟元素如<code>Navbar.Brand</code>，将会排列到右边。可以调转他们的顺序。
            </p>
            没有<code>Navbar.Brand</code>在最小的断点中显示:
        </>
    ),
    lgDesc: "切换器在左边，商标在右边：",
    rgDesc: "商标在左边，切换器在右边：",
    externalTitle: "外部内容",
    externalDesc: <>某些情况下，希望使用折叠插件触发内容的显示或隐藏。使用<code>Collapse</code>可以很容易做到。</>,
    variantApi: "导航条的主题",
    bgApi: "导航条的背景色",
    expandApi: "设置折叠内容的断点",
    tagApi: "自定义元素",
    hrefApi: "组件内a元素的href",
    seeDesc: "见",
    onClickApi: "按钮被点击的回调"
}