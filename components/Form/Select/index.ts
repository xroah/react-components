import {SelectHTMLAttributes} from "react"
import {SizeProp} from "../../Commons/consts-and-types"
import {sizePropType} from "../../Commons/prop-types"
import {createSizeElement} from "../../Commons/SizeConsumer"

export default function Select(
    props: SizeProp & SelectHTMLAttributes<HTMLSelectElement>
) {
    return createSizeElement(
        props,
        {
            tag: "select",
            prefix: "form-select"
        }
    )
}

Select.propTypes = {
    size: sizePropType
}