import * as React from "react";
import ScaleMatch from "./ScaleMatch";
import ButtonCounter from "./ButtonCounter";
import Contextual from "./Contextual";
import Pill from "./Pill";
import Link from "./Link";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";

const ScaleMathSrc = require("!!raw-loader!./ScaleMatch").default;
const ButtonCounterSrc = require("!!raw-loader!./ButtonCounter").default;
const ContextualSrc = require("!!raw-loader!./Contextual").default;
const PillSrc = require("!!raw-loader!./Pill").default;
const LinkSrc = require("!!raw-loader!./Link").default;

export default () => (
    <>
        <DocHeading>Badges</DocHeading>
        <div>
            Badges scale to match the size of the immediate parent element by using relative font sizing and em units.
        </div>
        <DemoExample component={<ScaleMatch/>} source={ScaleMathSrc}/>
        <div>Badges can be used as part of links or buttons to provide a counter.</div>
        <DemoExample component={<ButtonCounter/>} source={ButtonCounterSrc}/>
        <div>
            Note that depending on how they are used, badges may be confusing for users of screen readers and similar assistive technologies. While the styling of badges provides a visual cue as to their purpose, these users will simply be presented with the content of the badge. Depending on the specific situation, these badges may seem like random additional words or numbers at the end of a sentence, link, or button.

            Unless the context is clear (as with the “Notifications” example, where it is understood that the “4” is the number of notifications), consider including additional context with a visually hidden piece of additional text.
        </div>
        <DocHeading>Contextual variations</DocHeading>
        <div>
            Add any of the below mentioned modifier classes to change the appearance of a badge.
        </div>
        <DemoExample component={<Contextual/>} source={ContextualSrc}/>
        <DocHeading>Pill badges</DocHeading>
        <div>
            Use the .badge-pill modifier class to make badges more rounded (with a larger border-radius and additional horizontal padding). Useful if you miss the badges from v3.
        </div>
        <DemoExample component={<Pill/>} source={PillSrc}/>
        <DocHeading>Links</DocHeading>
        <DemoExample component={<Link/>} source={LinkSrc}/>
    </>
);