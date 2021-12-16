import {
    Alignment,
    ColSpan,
    ColSpanBreakpoints,
    Size,
    SizeProp
} from "../Commons/consts-and-types"

type FormCol = ColSpan | ColSpanBreakpoints | null
type FormAttrs = React.FormHTMLAttributes<HTMLFormElement>
type Attrs = React.HTMLAttributes<HTMLElement>

export type FormWrapper = React.ElementType | React.ReactElement | null

export interface FormCommon extends SizeProp {
    labelAlign?: Alignment
    labelCol?: FormCol
    labelSize?: Size
    childrenCol?: FormCol
    itemWrapper?: FormWrapper
}

export interface FormProps extends FormCommon, FormAttrs {
    validated?: boolean
    feedbackTooltip?: boolean
}

export interface FormItemProps extends FormCommon, Attrs {
    label?: string
    htmlFor?: string
    help?: React.ReactNode
    wrapper?: FormWrapper
}