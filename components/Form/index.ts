import Form from "./Form"
import FormItem from "./Item"
import Floating from "./Floating"
import Feedback from "./Feedback"

interface FormType {
    Item: typeof FormItem
    Floating: typeof Floating
    Feedback: typeof Feedback
}

const _Form = Form as (FormType & typeof Form)

_Form.Item = FormItem
_Form.Feedback = Feedback
_Form.Floating = Floating

export default _Form