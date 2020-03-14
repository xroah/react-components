import * as React from "react";

export default {
    compDesc: "为用户的操作提供一些有用的、灵活的、与上下文有关的反馈信息。",
    egTitle: "示例",
    egDesc: <>Alerts 可用于任何长度的文本包括一个可选的关闭按钮，使用8个类型之一展示合适的样式。（例如:<code>variant="success"</code>）。</>,
    lcTitle: "链接颜色",
    lcDesc: <>使用<code>Alert.Link</code>适配Alert组件内的链接颜色。</>,
    acTitle: "附加内容",
    acDesc: "Alerts也能够包含一些附加的元素如标题、段落以及分割线。",
    dsTitle: "可关闭",
    tgTitle: "切换",
    variantApi: "Alert的外观样式",
    fadeApi: "淡入淡出效果",
    visibleApi: "Alert组件是否可见",
    headingApi: "附加的标题",
    dismissApi: <>显示关闭按钮，并给Alert添加额外的<code>padding-right</code></>,
    onCloseApi: <>如果dismissible传入了<code>true</code>，该回调函数会在关闭按钮被点击时调用，否则该回调函数会在<code>visible</code>由<code>true</code>变为<code>false</code>时调用</>,
    onClosedApi: "该回调函数会在Alert消失之后调用"
}