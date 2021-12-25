import {FunctionComponent, HTMLAttributes} from "react"
import {createComponent} from "reap-utils/lib/react"
import {AnchorAttrs} from "../Commons/consts-and-types"
import {PREFIX} from "./constants"
import Navbar from "./Navbar"
import NavbarToggler from "./Toggler"
import NavbarCollapse from "./Collapse"

const Brand = createComponent<AnchorAttrs>({
    tag: "a",
    className: `${PREFIX}-brand`
})
const Text = createComponent<HTMLAttributes<HTMLSpanElement>>({
    tag: "span",
    className: `${PREFIX}-text`
})

interface NavBarType {
    Brand: typeof Brand
    Collapse: typeof NavbarCollapse
    Text: typeof Text
    Toggler: typeof NavbarToggler
}

const N = Navbar as NavBarType & typeof Navbar

N.Brand = Brand
N.Collapse = NavbarCollapse
N.Text = Text
N.Toggler = NavbarToggler

export default N