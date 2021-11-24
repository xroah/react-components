import {createComponent} from "../../Commons/utils"
import Input from "./Input"
import Group from "./Group"

const Text = createComponent({
    tag: "div",
    displayName: "InputGroupText",
    className: "input-group-text"
})

type InputType = {
    Group: typeof Group
    Text: typeof Text
} & typeof Input

const _Input = Input as InputType

_Input.Group = Group
_Input.Text = Text

export default _Input