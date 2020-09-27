import * as React from "react"

export default {
    containerTitle: "Container",
    containerDesc: <>Containers are the most basic layout element and are <strong>required when using our default grid system</strong>. Containers are used to contain, pad, and (sometimes) center the content within them. While containers can be nested, most layouts do not require a nested container.</>,
    allTitle: "All-in-one",
    allDesc: <>Our default <code>Container</code> is a responsive, fixed-width container, meaning its <code>max-width</code> changes at each breakpoint.</>,
    fluidTitle: "Fluid",
    fluidDesc: <>Use <code>fluid</code> prop for a full width container, spanning the entire width of the viewport.</>,
    resTitle: "Responsive",
    resDesc: <>Responsive containers are 100% wide until the specified breakpoint is reached, after which we apply <code>max-width</code>s for each of the higher breakpoints. For example, <code>&lt;Container sm /&gt;</code> is 100% wide to start until the <code>sm</code> breakpoint is reached, where it will scale up with <code>md</code>, <code>lg</code>, and <code>xl</code>.</>
}