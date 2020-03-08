import * as React from "react";
import DocHeading from "../../DocHeading";
import SyntaxHighlighter from "../../SyntaxHighlighter/";

export default () => (
    <>
        <DocHeading>Container</DocHeading>
        <div>
            Containers are the most basic layout element and are <strong>required when using our default grid system</strong>. Containers are used to contain, pad, and (sometimes) center the content within them. While containers can be nested, most layouts do not require a nested container.
        </div>
        <DocHeading tag="h3">All-in-one</DocHeading>
        <div>
            Our default <code>Container</code> is a responsive, fixed-width container, meaning its <code>max-width</code> changes at each breakpoint.
        </div>
        <div className='bd-example'>
            <SyntaxHighlighter code={`<Container>
    <!-- Content here -->
</Container>`} />
        </div>
        <DocHeading tag="h3">Fluid</DocHeading>
        <div>
            Use <code>fluid</code> prop for a full width container, spanning the entire width of the viewport.
        </div>
        <div className="bd-example">
            <SyntaxHighlighter code={`<Container variant="fluid">
    ...
</Container>`} />
        </div>
        <DocHeading tag="h3">Responsive</DocHeading>
        <div>
            Responsive containers are 100% wide until the specified breakpoint is reached, after which we apply <code>max-width</code>s for each of the higher breakpoints. For example, <code>&lt;Container sm /&gt;</code> is 100% wide to start until the <code>sm</code> breakpoint is reached, where it will scale up with <code>md</code>, <code>lg</code>, and <code>xl</code>.
        </div>
        <div className="bd-example">
        <SyntaxHighlighter code={`<Container variant="sm">100% wide until small breakpoint</Container>
<Container variant="md">100% wide until medium breakpoint</Container>
<Container variant="lg">100% wide until large breakpoint</Container>
<Container variant="xl">100% wide until extra large breakpoint</Container>`} />
        </div>
    </>
)