import * as React from "react"

export default {
    compDesc: "表单样式、布局选项和自定义组件的示例和使用方法，来创建各种表单。",
    basicTitle: "基础示例",
    gridTitle: "表单网格",
    gridDesc: "使用网格组件创建复杂的表单",
    rowTitle: "表单行",
    rowDesc: <>给<code>Row</code>设置<code>form</code>属性来创建更紧凑的布局。</>,
    complexDesc: "也可以通过网格系统来创建更复杂的布局。",
    horizontalTitle: "水平排列",
    horizontalDesc: <>通过给<code>Form</code>或者<code>Form.Item</code>设置<code>horizontal</code>、<code>labelCol</code>和<code>wrapperCol</code>属性来创建水平排列的表单。</>,
    inlineTitle: "内联表单",
    inlineDesc:<>使用<code>inline</code>属性，使内容在水平方向上依次排列。</>,
    validationTitle: "表单验证",
    validationDesc: (
        <>
            <div>
                HTML5表单验证为用户提供有价值的、可操作的反馈。–<a href="https://caniuse.com/#feat=form-validation">所有支持的浏览器</a>. 选择浏览器默认的验证反馈，或者使用我们内建的自定义反馈信息
            </div>
            <div className="bd-callout bd-callout-warning">
                我们推荐使用自定义验证样式，浏览器默认的验证信息在辅助技术上各个浏览器之间表现的并不一致(最值得注意的是桌面端和移动端的Chrome)
            </div> 
        </>
    ),
    customStylesTitle: "自定义样式",
    customStylesDesc: (
        <>
            <p>
                对于自定义表单验证信息，需要给<code>Form</code>组件添加<code>noValidate</code>属性。这禁止浏览器显示默认的反馈信息，但是JavaScript API仍然可以用来验证表单。试着提交下面的表单，JavaScript将会拦截表单提交按钮并且显示反馈信息。当视图提交表单时，你将会看到<code>:invalid</code>和<code>:valid</code>样式应用到表单控制元素上。
            </p>
            <p>
                自定义反馈样式应用自定义颜色、边框、聚焦样式和背景图标。背景图标在<code>&lt;select&gt;</code>中，只有在应用了<code>.custom-select</code>式有效，而不是<code>.form-control</code>
            </p>
        </>
    ),
    browserDefaultTitle: "浏览器默认",
    browserDefaultDesc: (
        <>
            <p>
                对自定义反馈消息或者编写JavaScript改变表单的行为不感兴趣？你可以使用浏览器默认的验证。尝试提交下面的表单。这取决于你的浏览器和操作系统，你将会看到反馈样式有细微的不同
            </p>
            <p>
                然而这些反馈样式并不能通过CSS来改变，你仍然可以通过JavaScript来自定义反馈文本
            </p>
        </>
    ),
    tooltipsTitle: "Tooltips",
    tooltipsDesc: <>如果你的布局允许的话， 你可以设置<code>validationTooltip</code>式反馈信息以tooltip的样式显示。保证有一个父元素有<code>position: relative</code>为tooltip定位。在下面的例子中，我们的列组件已经有该属性了，但是你的项目可能需要设置</>,
    checkboxTitle: "复选框",
    indeterminateDesc: <>复选框可以使用<code>:indeterminate</code>伪类，需要手动通过js设置（没有对应的HTML属性来指定）。</>,
    radioTitle: "单选框",
    switchTitle: "开关",
    inlineApi: "内联表单，所有内容水平方向上依次排列",
    labelColApi: <>同<code>Col</code>组件的属性,使用<code>Col</code>包裹标签</>,
    wrapperColApi: <>同<code>Col</code>组件的属性,使用<code>Col</code>包裹<code>Form.Item</code>的子组件</>,
    horizontalApi: "创建水平表单",
    labelAlignApi: "标签的对齐方式",
    itemHApi: "创建水平的表单项",
    itemLabelTextApi: "标签文本",
    itemLabelApi: <>使用<code>label</code>元素包裹标签文本</>,
    itemLabelColApi: <>同<code>Col</code>组件的属性,使用<code>Col</code>包裹标签。会覆盖<code>Form</code>的labelCol属性</>,
    itemWrapperColApi: <>同<code>Col</code>组件的属性,使用<code>Col</code>包裹<code>Form.Item</code>的子组件。会覆盖<code>Form</code>的wrapperCol属性</>,
    itemLabelAlignApi: <>label的对齐方式。会覆盖<code>Form</code>的labelAlign属性 </>,
    htmlForApi: <>给<code>label</code>元素设置<code>for</code>属性</>,
    helpApi: "帮助文本",
    controlApi: <>给子组件添加'<code>form-control</code>' class</>,
    validFeedbackApi: "验证成功的信息",
    invalidFeedbackApi: "验证失败的信息",
    validationTooltipApi: "以tooltip的样式显示反馈信息",
    formItemNote: <><strong>注:</strong>如果<code>Form.Item</code>的children是自定义组件， <code>help</code>, <code>validFeedback</code>和<code>invalidFeedback</code>属性需要手动处理</>,
    autoFocusApi: "自动聚焦",
    checkedApi: "是否选中",
    defaultCheckedApi: "初始的选中状态",
    disabledApi: "禁用组件",
    onChangeApi: "选中状态改变时的回调",
    customInlineApi: "内联模式",
    noteDesc: <><strong>注:</strong><code>className</code>和<code>style</code>属性将会传给Checkbox,Radio或者Switch的根元素，
    其他的属性将会传给input元素。</>
}