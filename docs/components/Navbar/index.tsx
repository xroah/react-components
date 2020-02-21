import * as React from "react";
import DocHeading from "../DocHeading";
import DemoExample from "../DemoExample";
import { Navbar } from "reap-ui";
import SyntaxHighlighter from "../SyntaxHighlighter";
import logo from "../../assets/bootstrap-solid.svg";
import Demo from "./Demo";
import DemoSrc from "!!raw-loader!./Demo";
import Color from "./Color";
import ColorSrc from "!!raw-loader!./Color";
import Toggler from "./Toggler";
import TogglerSrc from "!!raw-loader!./Toggler";
import LeftToggler from "./LeftToggler";
import LeftTogglerSrc from "!!raw-loader!./LeftToggler";
import RightToggler from "./RightToggler";
import RightTogglerSrc from "!!raw-loader!./RightToggler";
import ExternalContent from "./ExternalContent";
import ExternalContentSrc from "!!raw-loader!./ExternalContent";
import API from "./API";

export default () => (
    <>
        <DocHeading>Navbar</DocHeading>
        <div>
            A powerful, responsive navigation header, the navbar. Includes support for branding, navigation, and more, including support for our collapse plugin.
        </div>
        <DemoExample
            title="Example"
            component={<Demo />}
            source={DemoSrc}>
            Here’s an example of all the sub-components included in a responsive light-themed navbar that automatically collapses at the <code>lg</code> (large) breakpoint.
        </DemoExample>
        <DocHeading tag="h3">Brand</DocHeading>
        <div>
            The <code>Navbar.Brand</code> can be applied to most elements, but an anchor works best as some elements might require utility classes or custom styles.
        </div>
        <div className="bd-example">
            <Navbar bg="light">
                <Navbar.Brand href="#">Navbar</Navbar.Brand>
            </Navbar>
            <Navbar bg="light">
                <Navbar.Brand tag="span">Navbar</Navbar.Brand>
            </Navbar>
            <SyntaxHighlighter code={`<!-- As a link -->
<Navbar bg="light">
    <Navbar.Brand href="#">Navbar</Navbar.Brand>
</Navbar>

<!-- As a heading -->
<Navbar bg="light">
    <Navbar.Brand tag="span">Navbar</Navbar.Brand>
</Navbar>
`} />
        </div>
        <div>
            Adding images to the <code>Navbar.Brand</code> will likely always require custom styles or utilities to properly size. Here are some examples to demonstrate.
        </div>
        <div className="bd-example">
            <Navbar bg="light">
                <Navbar.Brand href="#">
                    <img src={logo} alt="" width={30} height={30} />
                </Navbar.Brand>
            </Navbar>
            <SyntaxHighlighter code={`<!-- Just an image -->
<Navbar bg="light">
    <Navbar.Brand href="#">
        <img src="path/to/img" alt="" width={30} height={30}/>
    </Navbar.Brand>
</Navbar>
`} />
        </div>
        <div className="bd-example">
            <Navbar bg="light">
                <Navbar.Brand href="#">
                    <img src={logo} alt="" width={30} height={30} />
                    &nbsp;Bootstrap
                </Navbar.Brand>
            </Navbar>
            <SyntaxHighlighter code={`<!-- Image and text -->
<Navbar bg="light">
    <Navbar.Brand href="#">
        <img src="path/to/img" alt="" width={30} height={30}/>
        &nbsp;Bootstrap
    </Navbar.Brand>
</Navbar>
`} />
        </div>
        <DocHeading tag="h3">Text</DocHeading>
        <div>
            Navbars may contain bits of text with the help of <code>Navbar.Text</code>. This class adjusts vertical alignment and horizontal spacing for strings of text.
        </div>
        <div className="bd-example">
            <Navbar bg="light">
                <Navbar.Text>Navbar text with an inline element</Navbar.Text>
            </Navbar>
        </div>
        <SyntaxHighlighter code={`<Navbar bg="light">
    <Navbar.Text>Navbar text with an inline element</Navbar.Text>
</Navbar>`} />
        <DemoExample
            title="Color schemes"
            component={<Color />}
            source={ColorSrc}>
            Theming the navbar has never been easier thanks to the combination of theming classes and background-color utilities. Choose from <code>variant="light"</code> for use with light background colors, or <code>variant="dark"</code> for dark background colors.
        </DemoExample>
        <DocHeading tag="h3">Responsive behaviors</DocHeading>
        <div>
            <p>
                Navbars can utilize <code>Navbar.Toggle</code>, <code>Navbar.Collapse</code>, set <code>expand(sm | md | lg | xl)</code> to change when their content collapses behind a button. In combination with other utilities, you can easily choose when to show or hide particular elements.
            </p>
            For navbars that never collapse, set <code>expand={true}</code> on the navbar. For navbars that always collapse, set <code>expand={false}</code> or pass nothing.
        </div>
        <DemoExample
            title="Toggler"
            component={<Toggler />}
            source={TogglerSrc}>
            <p>
                Navbar togglers are left-aligned by default, but should they follow a sibling element like a <code>Navbar.Brand</code>, they’ll automatically be aligned to the far right. Reversing your markup will reverse the placement of the toggler. Below are examples of different toggle styles.
            </p>
            With no <code>Navbar.Brand</code> shown in lowest breakpoint:
        </DemoExample>
        <DemoExample
            component={<LeftToggler />}
            source={LeftTogglerSrc}>
            With a toggler on the left and brand name on the right:
        </DemoExample>
        <DemoExample
            component={<RightToggler />}
            source={RightTogglerSrc}>
            With a brand name shown on the left and toggler on the right:
        </DemoExample>
        <DemoExample
            title="External content"
            component={<ExternalContent />}
            source={ExternalContentSrc}>
            Sometimes you want to use the collapse plugin to trigger hidden content elsewhere on the page, that’s easily done!
        </DemoExample>
        <API />
    </>
);