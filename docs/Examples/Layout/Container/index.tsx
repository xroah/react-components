import * as React from "react"
import DocHeading from "../../../components/DocHeading"
import SyntaxHighlighter from "../../../components/SyntaxHighlighter"
import LangMsg from "../../../components/Language/LanguageMessage"
import {
    containerId,
    containerTitle,
    allId,
    allTitle,
    fluidId,
    fluidTitle,
    resTitle,
    resId
} from "../RightNav"

const { H3 } = DocHeading

export default () => (
    <>
        <DocHeading id={containerId}>{containerTitle}</DocHeading>
        <div><LangMsg id="containerDesc" />;</div>
        <H3 id={allId}>{allTitle}</H3>
        <div><LangMsg id="allDesc" />;</div>
        <div className='bd-example'>
            <SyntaxHighlighter code={`<Container>
    <!-- Content here -->
</Container>`} />
        </div>
        <H3 id={fluidId}>{fluidTitle}</H3>
        <div><LangMsg id="fluidDesc" />;</div>
        <div className="bd-example">
            <SyntaxHighlighter code={`<Container variant="fluid">
    ...
</Container>`} />
        </div>
        <H3 id={resId}>{resTitle}</H3>
        <div><LangMsg id="resDesc" />;</div>
        <div className="bd-example">
            <SyntaxHighlighter code={`<Container variant="sm">100% wide until small breakpoint</Container>
<Container variant="md">100% wide until medium breakpoint</Container>
<Container variant="lg">100% wide until large breakpoint</Container>
<Container variant="xl">100% wide until extra large breakpoint</Container>`} />
        </div>
    </>
)