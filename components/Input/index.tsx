import Input from "./Input"
import Group from "./InputGroup"
import Text from "./Text"

type InputType = typeof Input & { Text: typeof Text, Group: typeof Group }

const _Input = Input as InputType

_Input.Text = Text
_Input.Group = Group

export default _Input