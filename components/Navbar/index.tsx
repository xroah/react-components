import {FunctionComponent} from "react"
import {createComponentByClass} from "../utils"
import Brand from "./Brand"
import Collapse from "./Collapse"
import Toggle from "./Toggle"
import Navbar from "./Navbar"
import {CommonProps} from "../Common/CommonPropsInterface"

interface NavbarComponent {
    Brand: typeof Brand
    Collapse: typeof Collapse
    Toggle: typeof Toggle
    Text: FunctionComponent<CommonProps<HTMLSpanElement>>
}

type NavbarType = typeof Navbar & NavbarComponent

const _Navbar = Navbar as NavbarType

_Navbar.Brand = Brand
_Navbar.Collapse = Collapse
_Navbar.Toggle = Toggle
_Navbar.Text = createComponentByClass({
    tag: "span",
    displayName: "NavbarText",
    className: "navbar-text"
})

export default _Navbar