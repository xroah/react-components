import Button from "./Button"
import Toggle from "./Toggle"
import Group from "./Group"
import Toolbar from "./Toolbar"

interface ButtonType {
    Toggle: typeof Toggle
    Group: typeof Group,
    Toolbar: typeof Toolbar
}

const _Button = Button as (ButtonType & typeof Button)

_Button.Toggle = Toggle
_Button.Group = Group
_Button.Toolbar = Toolbar

export default _Button