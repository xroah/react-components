import Button from "./Button"
import Toggle from "./Toggle"
import Group from "./Group"

interface ButtonType {
    Toggle: typeof Toggle
    Group: typeof Group
}

const _Button = Button as (ButtonType & typeof Button)

_Button.Toggle = Toggle
_Button.Group = Group

export default _Button