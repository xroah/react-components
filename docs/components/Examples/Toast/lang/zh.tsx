import * as React from "react"

export default {
    compDesc: "Toast是一个轻量级通知组建，为模仿移动端和桌面端推送通知而设计。使用flexbox创建，所以很容易排列和定位。",
    egTitle: "示例",
    dismissingTitle: "关闭",
    autoHideTitle: "自动隐藏",
    visibleApi: "Toast是否可见",
    closableApi: "右上角是否显示关闭按钮",
    titleApi: "Toast标题",
    extraApi: "右上角额外的信息",
    iconApi: "左上角的图标",
    iconSizeApi: "图标的尺寸",
    autoHideApi: "是否自动关闭",
    delayApi: "自动关闭的延迟时间（ms）",
    fadeApi: "淡入淡出效果当Toast显示或关闭",
    headerApi: <>自定义头部（如果不需要可以设置<code>null</code>）</>,
    onCloseApi: "点击关闭按钮或自动隐藏时的回调",
    onShowApi: <>当<code>visible</code>由<code>false</code>改为<code>true</code>时的回调</>,
    onShownApi: "当toast完全显示时的回调",
    onHideApi: <>当<code>visible</code>由<code>true</code>改为<code>false</code>时的回调</>,
    onHiddenApi: "当toast完全隐藏时的回调"
}