import * as React from "react";
import DocHeading from "../../DocHeading";
import DemoExample from "../../DemoExample";
import EqualWidth from "./EqualWidth";
import EqualWidthSrc from "!!raw-loader!./EqualWidth";
import OneColumnWidth from "./OneColumnWidth";
import OneColumnWidthSrc from "!!raw-loader!./OneColumnWidth";
import VariableWidthContent from "./VariableWidthContent";
import VariableWidthContentSrc from "!!raw-loader!./VariableWidthContent";
import MixAndMatch from "./MixAndMatch";
import MixAndMatchSrc from "!!raw-loader!./MixAndMatch";
import RowColumns from "./RowColumns";
import RowColumnsSrc from "!!raw-loader!./RowColumns";
import RowColumns2 from "./RowColumns2";
import RowColumns2Src from "!!raw-loader!./RowColumns2";
import RowColumns3 from "./RowColumns3";
import RowColumns3Src from "!!raw-loader!./RowColumns3";
import VerticalAlignment from "./VerticalAlignment";
import VerticalAlignmentSrc from "!!raw-loader!./VerticalAlignment";
import VerticalAlignment2 from "./VerticalAlignment2";
import VerticalAlignment2Src from "!!raw-loader!./VerticalAlignment2";
import HorizontalAlignment from "./HorizontalAlignment";
import HorizontalAlignmentSrc from "!!raw-loader!./HorizontalAlignment";
import Order from "./Order";
import OrderSrc from "!!raw-loader!./Order";
import Offset from "./Offset";
import OffsetSrc from "!!raw-loader!./Offset";

export default () => (
    <>
        <DocHeading>Grid</DocHeading>
        <div>
            Bootstrap’s grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive.
        </div>
        <DemoExample
            title="Equal-width"
            className="bd-example-row"
            component={<EqualWidth />}
            source={EqualWidthSrc}>
            For example, here are two grid layouts that apply to every device and viewport, from <code>xs</code> to <code>xl</code>. Add any number of unit-less props for each breakpoint you need and every column will be the same width.
        </DemoExample>
        <DemoExample
            title="Setting one column width"
            className="bd-example-row"
            component={<OneColumnWidth />}
            source={OneColumnWidthSrc}>
            Auto-layout for flexbox grid columns also means you can set the width of one column and have the sibling columns automatically resize around it.  Note that the other columns will resize no matter the width of the center column.
        </DemoExample>
        <DemoExample
            title="Variable width content"
            className="bd-example-row"
            component={<VariableWidthContent />}
            source={VariableWidthContentSrc}>
            Use <code dangerouslySetInnerHTML={{ __html: `{breakpoint}="auto"` }} /> props to size columns based on the natural width of their content.
        </DemoExample>
        <DemoExample
            title="Mix and match"
            className="bd-example-row"
            component={<MixAndMatch />}
            source={MixAndMatchSrc}>
            Don’t want your columns to simply stack in some grid tiers? Use a combination of different props for each tier as needed. See the example below for a better idea of how it all works.
        </DemoExample>
        <DemoExample
            title="Row columns"
            className="bd-example-row"
            component={<RowColumns />}
            source={RowColumnsSrc}>
            <p>
                Use the responsive <code>cols</code> prop to quickly set the number of columns that best render your content and layout.Whereas normal .col-* classes apply to the individual columns (e.g., .col-md-4), the row columns classes are set on the parent .row as a shortcut.
            </p>

            Use these row columns prop to quickly create basic grid layouts or to control your card layouts.
        </DemoExample>
        <DemoExample
            className="bd-example-row"
            component={<RowColumns2 />}
            source={RowColumns2Src} />
        <DemoExample
            className="bd-example-row"
            component={<RowColumns3 />}
            source={RowColumns3Src} />
        <DocHeading tag="h3">Alignment</DocHeading>
        <div>
            Use flexbox alignment utilities to vertically and horizontally align columns.
        </div>
        <DemoExample
            className="bd-example-row"
            title="Vertical alignment"
            component={<VerticalAlignment />}
            source={VerticalAlignmentSrc} />
        <DemoExample
            className="bd-example-row"
            component={<VerticalAlignment2 />}
            source={VerticalAlignment2Src} />
        <DocHeading tag="h3">No gutters</DocHeading>
        <div>
            The gutters between columns in our predefined grid classes can be removed with <code>noGutters</code> prop. This removes the negative margins from <code>Row</code> and the horizontal padding from all immediate children columns.
        </div>
        <DemoExample
            className="bd-example-row"
            title="Horizontal alignment"
            component={<HorizontalAlignment />}
            source={HorizontalAlignmentSrc} />
        <DemoExample
            className="bd-example-row"
            title="Reordering"
            component={<Order />}
            source={OrderSrc}>
            Use <code>order</code> props for controlling the visual order of your content. These classes are responsive, so you can set the order by breakpoint (e.g., <code dangerouslySetInnerHTML={{ __html: '<Col order={1} md={{order: 2}}/>' }} />). Includes support for 1 through 12 across all five grid tiers.
        </DemoExample>
        <DemoExample
            className="bd-example-row"
            title="Reordering"
            component={<Offset />}
            source={OffsetSrc}>
            You can offset grid columns in two ways: our responsive offset props and our margin utilities. Grid classes are sized to match columns while margins are more useful for quick layouts where the width of the offset is variable. These classes increase the left margin of a column by columns.
        </DemoExample>
    </>
);