import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Nest from "./Nest";
import NestSrc from "!!raw-loader!./Nest";
import Alignment from "./Alignment";
import AlignmentSrc from "!!raw-loader!./Alignment";
import API from "./API";

export default () => (
    <>
        <DocHeading>Media object</DocHeading>
        <div>
            Documentation and examples for Bootstrap’s media object to construct highly repetitive components like blog comments, tweets, and the like.
        </div>
        <DemoExample
            title="Example"
            component={<Basic />}
            source={BasicSrc}>
            The media object helps build complex and repetitive components where some media is positioned alongside content that doesn’t wrap around said media.
        </DemoExample>
        <DemoExample
            title="Example"
            component={<Nest />}
            source={NestSrc}>
            Media objects can be infinitely nested, though we suggest you stop at some point.
        </DemoExample>
        <DemoExample
            title="Alignment"
            component={<Alignment />}
            source={AlignmentSrc}>
            Media in a media object can be aligned  to the top (default), middle, or bottom of your content.
        </DemoExample>

        <API />
    </>
);