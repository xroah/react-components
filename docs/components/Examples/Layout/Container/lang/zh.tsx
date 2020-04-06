import * as React from "react";

export default {
    containerTitle: "容器",
    containerDesc: <>容器是最基础的布局组件，并且<strong>当使用网格系统时该组件是必要的</strong>。容器是用来包含、填充以及（有时）使内容居中。容器可以嵌套，大多数布局不需要容器嵌套。</>,
    allTitle: "多合一",
    allDesc: <>默认的<code>Container</code>是响应式的， 固定宽度的容器，意味着<code>max-width</code>在每个断点都会改变。</>,
    fluidTitle: "流动容器",
    fluidDesc: <>使用<code>fluid</code>属性创建一个全宽的容器，宽度扩展到整个视口。</>,
    resTitle: "响应式",
    resDesc: <>响应式容器是100%宽度的直到视口宽度大于指定的断点，之后将会应用<code>max-width</code>给每个更大的断点。 例如 <code>&lt;Container sm /&gt;</code>100%宽度始于<code>sm</code>断点，在<code>md</code>, <code>lg</code>, 和<code>xl</code>断点将会放大。</>
}