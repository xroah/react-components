import * as React from "react";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import Basic from "./Basic";
import BasicSrc from "!!raw-loader!./Basic";
import Static from "./Static";
import StaticSrc from "!!raw-loader!./Static";
import Centered from "./Centered";
import CenteredSrc from "!!raw-loader!./Centered";
import LongContent from "./LongContent";
import LongContentSrc from "!!raw-loader!./LongContent";
import Scrollable from "./Scrollable";
import ScrollableSrc from "!!raw-loader!./Scrollable";
import WithoutFade from "./WithoutFade";
import WithoutFadeSrc from "!!raw-loader!./WithoutFade";
import Size from "./Size";
import SizeSrc from "!!raw-loader!./Size";
import API from "./API";

export default () => (
    <>
        <DocHeading>Dialog</DocHeading>
        <div>
            Add dialogs to your site for lightboxes, user notifications, or completely custom content.
        </div>
        <DemoExample
            title="Live demo"
            component={<Basic />}
            source={BasicSrc}>
            Toggle a working modal demo by clicking the button below. It will slide down and fade in from the top of the page.
        </DemoExample>
        <DemoExample
            title="Static backdrop"
            component={<Static />}
            source={StaticSrc}>
            When backdrop is set to static, the modal will not close when clicking outside it. Click the button below to try it.
        </DemoExample>
        <DemoExample
            title="Scrolling long content"
            component={<LongContent />}
            source={LongContentSrc}>
            When modals become too long for the user’s viewport or device, they scroll independent of the page itself. Try the demo below to see what we mean.
        </DemoExample>
        <DemoExample
            component={<Scrollable />}
            source={ScrollableSrc}>
            You can also create a scrollable modal that allows scroll the modal body by setting <code>scrollable</code> prop.
        </DemoExample>
        <DemoExample
            title="Vertically centered"
            component={<Centered />}
            source={CenteredSrc}>
            Set <code>centered</code> prop to vertically center the modal.
        </DemoExample>
        <DemoExample
            title="Without animation"
            component={<WithoutFade />}
            source={WithoutFadeSrc}>
            For modals that simply appear rather than fade in to view, set <code>fade</code> to false
        </DemoExample>
        <DemoExample
            title="Optional sizes"
            component={<Size />}
            source={SizeSrc}>
            Modals have three optional sizes, available via <code>size</code> prop(xl | lg | sm).
        </DemoExample>
        <API />
    </>
);