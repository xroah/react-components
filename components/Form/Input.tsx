import * as React from "react"
import {
    Size,
    ValueOf
} from "@commons/consts-and-types"
import classNames from "reap-utils/lib/class-names"

const inputVariants = [
    "input",
    "textarea"
] as const

type Base = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">

interface InputProps extends Base {
    size?: Size
    htmlSize?: number
    variant?: ValueOf<typeof inputVariants>
}