import Form from "./Form";
import Item from "./Item";

type FormType = typeof Form & {Item: typeof Item};

const _Form = Form as FormType;

_Form.Item = Item;

export default _Form;