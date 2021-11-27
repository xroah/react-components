import * as React from "react"
import {SizeProp} from "../../Commons/consts-and-types"
import {createSizeElement} from "../../Commons/SizeConsumer"

export default function Select(
    props: SizeProp & React.SelectHTMLAttributes<HTMLSelectElement>
) {
    return createSizeElement(
        props,
        {
            tag: "select",
            prefix: "form-select"
        }
    )
}