import * as React from "react";
import { Card } from "reap-ui";
import DocHeading from "../DocHeading";
import Basic from "./Basic";
import DemoExample from "../DemoExample";
import BasicSrc from "!!raw-loader!./Basic";
import TTL from "./TitlesTextLinks";
import TTLSrc from "!!raw-loader!./TitlesTextLinks";
import SyntaxHighlighter from "../SyntaxHighlighter";
import ListGroup from "./ListGroup";
import ListGroupSrc from "!!raw-loader!./ListGroup";
import KitchenSink from "./KitchenSink";
import KitchenSinkSrc from "!!raw-loader!./KitchenSink";
import FooterHeader from "./FooterHeader";
import FooterHeaderSrc from "!!raw-loader!./FooterHeader";
import API from "./API";

export default () => (
    <>
        <DocHeading>About</DocHeading>
        <div>
            A card is a flexible and extensible content container. It includes options for headers and footers, a wide variety of content, contextual background colors, and powerful display options.
        </div>
        <DemoExample
            title="Basic Example"
            component={<Basic />}
            source={BasicSrc}>
            Cards are built with as little markup and styles as possible, but still manage to deliver a ton of control and customization. Built with flexbox, they offer easy alignment and mix well with other Bootstrap components. They have no margin by default, so use <a href="/docs/4.4/utilities/spacing/">spacing utilities</a> as needed.
        </DemoExample>
        <DocHeading>Content types</DocHeading>
        <div>
            Cards support a wide variety of content, including images, text, list groups, links, and more. Below are examples of what’s supported.
        </div>
        <DocHeading tag="h3">Body</DocHeading>
        <div>
            Use
            <code> &lt;Card.Body&gt; </code>
            to pad content inside a
            <code> &lt;Card&gt; </code>.
            Use it whenever you need a padded section within a card.
        </div>
        <div className="bd-example">
            <Card body>
                This is some text within a card body.
            </Card>
            <SyntaxHighlighter code={`<Card>
    <Card.Body>This is some text within a card body.</Card.Body>
</Card>`} />
            or
        <SyntaxHighlighter code={`<Card body>This is some text within a card body.</Card>`} />
        </div>
        <DemoExample
            title="Tiles, text, and links"
            component={<TTL />}
            source={TTLSrc} />
        <DemoExample
            title="List groups"
            component={<ListGroup />}
            source={ListGroupSrc}>
            Create lists of content in a card with a flush list group.
        </DemoExample>
        <DemoExample
            title="Kitchen sink"
            component={<KitchenSink />}
            source={KitchenSinkSrc}>
            Mix and match multiple content types to create the card you need, or throw everything in there. Shown below are image styles, blocks, text styles, and a list group—all wrapped in a fixed-width card.
        </DemoExample>
        <DemoExample
            title="Header and footer"
            component={<FooterHeader />}
            source={FooterHeaderSrc}>

        </DemoExample>
        <API/>
    </>
);