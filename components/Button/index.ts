import {HTMLAttributes} from "react"
import Button from "./Button"
import Toggle from "./Toggle"
import Group from "./Group"
import Close from "./Close"
import {createComponent} from "reap-utils/lib/react"
import {DivAttrs} from "../Commons/consts-and-types"

const Toolbar = createComponent<DivAttrs>({
    className: "btn-toolbar",
    tag: "div",
    displayName: "ButtonToolbar"
})

interface ButtonType {
    Toggle: typeof Toggle
    Group: typeof Group,
    Toolbar: typeof Toolbar,
    Close: typeof Close
}

const _Button = Button as (ButtonType & typeof Button)

_Button.Toggle = Toggle
_Button.Group = Group
_Button.Toolbar = Toolbar
_Button.Close = Close

export default _Button