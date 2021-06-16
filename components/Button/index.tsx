import Button from "./Button"
import Toggle from "./Toggle"
import Group from "./Group"
import Toolbar from "./Toolbar"
import Close from "./Close"

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