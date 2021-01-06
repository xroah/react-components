import * as React from "react"

export default {
    compDesc: "动态的标签页不应该包含下拉菜单，这样会导致可用性和可访问性问题。对于可用性来说，当前显示的标签页不是立即可见的（内部的关闭的下拉菜单也是如此），这样会导致困惑。对于可访问性来说，没有可感知的方法建立标准的WAI ARIA模式，这意味着对于使用辅助技术的用户来说不容易被理解。",
    basicTitle: "基础示例",
    pillsTitle: "胶囊标签页",
    noAnimTitle: "无过渡效果",
    customTitle: "自定义",
    activeKeyApi: "当前显示的标签页的key值(受控组件)",
    defaultActiveKeyApi: "初始显示的标签页的key之(如果defaultActiveKey和activeKey都没有传入, 则第一个会被激活)",
    pillsApi: "胶囊样式",
    fadeApi: "当标签切换时应用淡入淡出效果",
    onTabChangeApi: "标签页改变时的回调",
    onTabClickApi: <>标签页标签被点击时的回调(<code>TabPane</code>的tab属性不能为空)</>,
    tabApi: "标签页的标题",
    disabledApi: "禁用标签页",
    keyApi: "唯一的key值"
}