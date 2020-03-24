import * as React from "react";

const apiMsg = {
    fluidApi: "使jumbotron变成全宽，并且去掉圆角"
};

export default {
    compDesc: "灵活的展示内容的轻量级组件。",
    egTitle: "示例",
    egDesc: "一个灵活的轻量级组件，可以扩展到整个视口展示重要信息。",
    fluidDesc: <>{apiMsg.fluidApi}, 传入<code>fluid</code>属性或者放置在<code>fluid Container</code>组件中。</>,
    ...apiMsg
}