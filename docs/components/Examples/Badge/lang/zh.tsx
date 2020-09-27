import * as React from "react"

export default {
    compDesc: "小的计数标签组件",
    egTitle: "示例",
    egDesc: "Badges使用em单位来适应直接父元素。",
    counterDesc: "Badges可以作为链接或者按钮的计数器.",
    note: (
        <>
            <p>
                注: Badges可能会对使用屏幕阅读器或相似技术的用户感到困惑，这取决于你如何使用。Badges的样式给出了一些提示，将这些内容展示给这些用户。取决于具体的情形，这些badges可能会像句子、链接或者按钮末尾的随机附加词语或数字。
            </p>
            除非上下文是清晰的（正如“Notifications”示例一样，4被理解为通知的数量），可以考虑添加视觉上不可见的附加文本。
        </>
    ),
    varTitle: "外观类型",
    varDesc: "添加以下类型来改变badges的外观。",
    pillTitle: "胶囊badges",
    pillDesc: <>使用<code>pill</code>属性使badges更圆润(更大的<code>border-radius</code>以及水平的<code>padding</code>).</>,
    linkTitle: "链接",
    linkDesc: <>将<code>Badge</code>用在<code>&lt;a&gt;</code> 元素上，展现hover和focus状态(需要传入<code>href</code>属性).</>,
    varApi: "Badge的外观样式",
    hrefApi: "渲染成a元素， 并将href作为a元素的href属性的值",
    pillApi: "使badge更圆润(更大的border-radius以及水平的padding)"
}