import Button from "./Button"
import Toggle from "./Toggle"

interface ButtonType {
    Toggle: typeof Toggle
}

const _Button = Button as (ButtonType & typeof Button)

_Button.Toggle = Toggle

export default _Button