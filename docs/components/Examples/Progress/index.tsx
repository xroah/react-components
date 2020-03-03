import * as React from "react";
import DocHeading from "../../DocHeading";
import SyntaxHighlighter from "../../SyntaxHighlighter";
import { Progress } from "reap-ui";
import API from "./API";

export default () => (
    <>
        <DocHeading>Progress</DocHeading>
        <div>
            custom progress bars featuring support for stacked bars, animated backgrounds, and text labels.
        </div>

        <DocHeading tag="h3">Basic</DocHeading>
        <div className="bd-example">
            <Progress value={75} />
            <SyntaxHighlighter code="<Progress value={75}/>" />
        </div>

        <DocHeading tag="h3">Labels</DocHeading>
        <div>
            Add labels to your progress bars by placing text within the <code>Progress</code>.
        </div>
        <div className="bd-example">
            <Progress showLabel value={25} />
            <SyntaxHighlighter code="<Progress showLabel value={25}/>" />
        </div>

        <DocHeading tag="h3">Height</DocHeading>
        <div className="bd-example">
            <Progress style={{ height: 1 }} value={25} />
            <Progress value={25} />
            <SyntaxHighlighter code={`<Progress style={{height: 1}} value={25} />
<Progress value={25} />`} />
        </div>

        <DocHeading tag="h3">Backgrounds</DocHeading>
        <div className="bd-example">
            <Progress value={25} variant="success" />
            <Progress value={50} variant="info" />
            <Progress value={75} variant="warning" />
            <Progress value={100} variant="danger" />
        </div>
        <SyntaxHighlighter code={`<Progress value={25} variant="success"/>
<Progress value={50} variant="info"/>
<Progress value={75} variant="warning"/>
<Progress value={100} variant="danger"/>`} />

        <DocHeading tag="h3">Multiple bars</DocHeading>
        <div>
            Include multiple progress bars in a progress component if you need.
        </div>
        <div className="bd-example">
            <Progress>
                <Progress value={15} />
                <Progress value={30} variant="success" />
                <Progress value={20} variant="info" />
            </Progress>
            <SyntaxHighlighter code={`<Progress value={15}/>
<Progress value={30} variant="success"/>
<Progress value={20} variant="info"/>`} />
        </div>

        <DocHeading tag="h3">Stripped</DocHeading>
        <div>
            Set <code>striped</code> to any <code>Progress</code> to apply a stripe via CSS gradient over the progress bar’s background color.
        </div>
        <div className="bd-example">
            <Progress value={25} striped variant="success" />
            <Progress value={50} striped variant="info" />
            <Progress value={75} striped variant="warning" />
            <Progress value={100} striped variant="danger" />
            <SyntaxHighlighter code={`<Progress value={25} striped variant="success"/>
<Progress value={50} striped variant="info"/>
<Progress value={75} striped variant="warning"/>
<Progress value={100} striped variant="danger"/>`} />
        </div>

        <DocHeading tag="h3">Animated</DocHeading>
        <div>
            The striped gradient can also be animated. Set <code>animated</code> to progress bar to animate the stripes right to left via CSS3 animations.
        </div>
        <div className="bd-example">
            <Progress value={75} striped animated />
            <SyntaxHighlighter code={`<Progress value={75} striped animated />`} />
        </div>

        <API />
    </>
);