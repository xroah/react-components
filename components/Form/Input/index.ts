import {createComponent} from "@commons/utils"
import Input from "./Input"
import Group from "./InputGroup"

const Text = createComponent({
    tag: "div",
    displayName: "InputGroupText",
    className: "input-group-text"
})

interface InputType {
    Group: typeof Group
    Text: typeof Text
}

const _Input = Input as (InputType & typeof Input)

_Input.Group = Group
_Input.Text = Text

export default _Input