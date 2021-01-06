import containerLang from "../Container/lang/zh"
import gridLang from "../Grid/lang/zh"

export default {
    ...containerLang,
    ...gridLang,
    overviewTitle: "概览",
    overviewDesc: "布局组件包含容器、一个强大的网格系统、灵活的媒体对象以及响应式工具类",
    variantApi: "全宽的容器，适应视口的宽度(fluid)或者指定断点",
    noGuttersApi: "移除负的外边距和直接子列的内边距",
    rowAlignmentApi: "行内列的垂直对齐方式（flexbox的align-items属性）",
    justifyApi: "列的水平对齐（flexbox的justify-content属性）",
    formApi: "表单行",
    colsApi: "设置行的列数",
    colAlignmentApi: "列的对齐方式（flexbox的align-self属性）",
    spanApi: "设置列的宽度(apply 'col[-span]' classes)",
    orderApi: "列的顺序",
    offsetApi: "列的偏移",
    smApi: "小尺寸设备(≥576px)",
    mdApi: "中等尺寸设备(≥768px)",
    lgApi: "大尺寸设备(≥992px)",
    xlApi: "超大尺寸设备(≥1200px)"
}