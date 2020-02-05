import * as React from "react";
import Demo from "./Demo";
import DemoSrc from "!!raw-loader!./Demo";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import API from "./API";

export default () => (
    <>
        <DocHeading>Carousel</DocHeading>
        <div>
            A slideshow component for cycling through elements—images or slides of text—like a carousel.
        </div>
        <DemoExample
            title="Example"
            component={<Demo />}
            source={DemoSrc}>
            Carousels don’t automatically normalize slide dimensions. As such, you may need to use additional utilities or custom styles to appropriately size content. While carousels support previous/next controls and indicators, they’re not explicitly required. Add and customize as you see fit.
        </DemoExample>
        <API/>
    </>
);

