import * as React from "react";
import DocHeading from "../../DocHeading";
import { Spinner, Button } from "reap-ui";
import SyntaxHighlighter from "../../SyntaxHighlighter";
import API from "./API";

export default () => (
    <>
        <DocHeading>Spinner</DocHeading>
        <div>
            Spinners can be used to show the loading state in your projects. They’re built only with HTML and CSS, meaning you don’t need any JavaScript to create them. You will, however, need some custom JavaScript to toggle their visibility. Their appearance, alignment, and sizing can be easily customized .
        </div>
        <DocHeading tag="h3">Border spinner</DocHeading>
        <div className="bd-example">
            <Spinner animation="border" />
            <SyntaxHighlighter code={`<Spinner animation="border"/>`} />
        </div>
        <DocHeading tag="h3">Variants</DocHeading>
        <div className="bd-example">
            <Spinner animation="border" variant="primary" />
            <Spinner animation="border" variant="secondary" />
            <Spinner animation="border" variant="success" />
            <Spinner animation="border" variant="danger" />
            <Spinner animation="border" variant="warning" />
            <Spinner animation="border" variant="info" />
            <Spinner animation="border" variant="light" />
            <Spinner animation="border" variant="dark" />
            <SyntaxHighlighter code={`<>
    <Spinner animation="border" variant="primary"/>
    <Spinner animation="border" variant="secondary"/>
    <Spinner animation="border" variant="success"/>
    <Spinner animation="border" variant="danger"/>
    <Spinner animation="border" variant="warning"/>
    <Spinner animation="border" variant="info"/>
    <Spinner animation="border" variant="light"/>
    <Spinner animation="border" variant="dark"/>        
</>`} />
        </div>
        <DocHeading tag="h3">Growing spinner</DocHeading>
        <div className="bd-example">
            <Spinner animation="grow" />
            <SyntaxHighlighter code={`<Spinner animation="grow"/>`} />
        </div>
        <div className="bd-example">
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
            <Spinner animation="grow" variant="light" />
            <Spinner animation="grow" variant="dark" />
            <SyntaxHighlighter code={`<>
    <Spinner animation="grow" variant="primary"/>
    <Spinner animation="grow" variant="secondary"/>
    <Spinner animation="grow" variant="success"/>
    <Spinner animation="grow" variant="danger"/>
    <Spinner animation="grow" variant="warning"/>
    <Spinner animation="grow" variant="info"/>
    <Spinner animation="grow" variant="light"/>
    <Spinner animation="grow" variant="dark"/>        
</>`} />
        </div>
        <DocHeading>Size</DocHeading>
        <div>
            Add <code>size="sm"</code> to make a smaller spinner that can quickly be used within other components.
        </div>
        <div className="bd-example">
            <Spinner animation="border" size="sm" />
            <Spinner animation="grow" size="sm" />
            <SyntaxHighlighter code={`<>
    <Spinner animation="border" size="sm"/>
    <Spinner animation="grow" size="sm"/>
</>`} />
        </div>
        <div>Or use a number</div>
        <div className="bd-example">
            <Spinner animation="border" size={50} />
            <Spinner animation="grow" size={50} />
            <SyntaxHighlighter code={`<>
    <Spinner animation="border" size={50}/>
    <Spinner animation="grow" size={50}/>
</>`} />
        </div>
        <DocHeading tag="h3">Buttons</DocHeading>
        <div>
            Use spinners within buttons to indicate an action is currently processing or taking place. You may also swap the text out of the spinner element and utilize button text as needed.
        </div>
        <div className="bd-example">
            <Button className="mr-2" disabled>
                <Spinner animation="border" size="sm" />
            </Button>
            <Button disabled>
                <Spinner animation="border" size="sm" /> Loading
            </Button>
            <SyntaxHighlighter code={`<>
    <Button disabled>
        <Spinner animation="border" size="sm" />
    </Button>
    <Button disabled>
        <Spinner animation="border" size="sm" /> Loading
    </Button>            
</>`} />
        </div>
        <div className="bd-example">
            <Button className="mr-2" disabled>
                <Spinner animation="grow" size="sm" />
            </Button>
            <Button disabled>
                <Spinner animation="grow" size="sm" /> Loading
            </Button>
            <SyntaxHighlighter code={`<>
    <Button disabled>
        <Spinner animation="grow" size="sm" />
    </Button>
    <Button disabled>
        <Spinner animation="grow" size="sm" /> Loading
    </Button>            
</>`} />
        </div>
        <API />
    </>
);