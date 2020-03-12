import * as React from "react";
import DemoExample from "../../DemoExample";
import DocHeading from "../../DocHeading";
import Main from "../../Main";
import RightNav from "../../RightNav";
import ScaleMatch from "./ScaleMatch";
import ScaleMathSrc from "!!raw-loader!./ScaleMatch";
import Contextual from "./Contextual";
import ContextualSrc from "!!raw-loader!./Contextual";
import Pill from "./Pill";
import PillSrc from "!!raw-loader!./Pill";
import Link from "./Link";
import LinkSrc from "!!raw-loader!./Link";
import ButtonCounter from "./ButtonCounter";
import ButtonCounterSrc from "!!raw-loader!./ButtonCounter";
import API from "./API";


const { H3 } = DocHeading;

export default () => (
    <>
        <Main>
            <DocHeading>Badge</DocHeading>
            <div>
                Our small count and labeling component.
            </div>
            <H3 id="example">Example</H3>
            <DemoExample
                component={<ScaleMatch />}
                source={ScaleMathSrc}>
                <div>
                    Badges scale to match the size of the immediate parent element by using relative font sizing and em units.
            </div>
            </DemoExample>
            <DemoExample component={<ButtonCounter />} source={ButtonCounterSrc}>
                <div>Badges can be used as part of links or buttons to provide a counter.</div>
            </DemoExample>
            <div>
                <p>
                    Note that depending on how they are used, badges may be confusing for users of screen readers and similar assistive technologies. While the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the badge. Depending on the specific situation, these badges may seem like random additional words or numbers at the end of a sentence, link, or button.
                </p>
                Unless the context is clear (as with the “Notifications” example, where it is understood that the “4” is the number of notifications), consider including additional context with a visually hidden piece of additional text.
            </div>
            <H3 id="contextualVariations">Contextual variations</H3>
            <DemoExample
                className="badge-demo"
                component={<Contextual />}
                source={ContextualSrc}>
                Add any of the below mentioned variants to change the appearance of a badge.
            </DemoExample>
            <H3 id="pillBadges">Pill badges</H3>
            <DemoExample
                className="badge-demo"
                component={<Pill />}
                source={PillSrc} >
                Use the <code>pill</code> prop to make badges more rounded (with a larger <code>border-radius</code> and additional horizontal <code>padding</code>).
            </DemoExample>
            <H3 id="links">Links</H3>
            <DemoExample
                className="badge-demo"
                component={<Link />}
                source={LinkSrc}>
                Using the <code>Badge</code> on an <code>&lt;a&gt;</code> element quickly provide actionable badges with hover and focus states(by passing the <code>href</code> prop).
            </DemoExample>
            <DocHeading id="api">API</DocHeading>
            <API />
        </Main>
        <RightNav data={[
            {
                name: "Example",
                href: "#example"
            }, {
                name: "Contextual variations",
                href: "#contextualVariations"
            }, {
                name: "Pill badges",
                href: "#pillBadges"
            }, {
                name: "Links",
                href: "#links"
            }, {
                name: "API",
                href: "#api"
            }
        ]}/>
    </>
);