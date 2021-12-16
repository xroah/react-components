import {InputCommonProps} from "./Input"
import {sizePropType} from "../../Commons/prop-types"
import {createSizeElement} from "../../Commons/SizeConsumer"

export default function InputGroup(
    {
        hasValidation,
        ...restProps
    }: InputCommonProps & {hasValidation?: boolean}
) {
    return createSizeElement(
        restProps,
        {
            prefix: "input-group",
            getClass() {
                return hasValidation ? "has-validation" : ""
            }
        }
    )
}

InputGroup.propTypes = {
    size: sizePropType
}