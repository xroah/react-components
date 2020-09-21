import {
    AriaAttributes,
    DOMAttributes,
    ReactNode,
    CSSProperties,
    ChangeEventHandler
} from "react"

type Booleanish = boolean | "true" | "false"

//for customizing the title prop
export interface CustomTitleProp {
    title?: string | ReactNode
}

export interface CommonPropsWithoutTitle<T> extends AriaAttributes, DOMAttributes<T> {
    accessKey?: string
    className?: string
    contentEditable?: Booleanish | "inherit"
    dir?: string
    draggable?: Booleanish
    id?: string
    style?: CSSProperties
    tabIndex?: number
    role?: string
}

export interface CommonProps<T> extends CommonPropsWithoutTitle<T> {
    title?: string
}

export interface AnchorCommonProps<T> extends CommonProps<T> {
    download?: any
    href?: string
    target?: string
}

export interface ButtonCommonProps<T> extends CommonProps<T> {
    autoFocus?: boolean
    disabled?: boolean
    form?: string
    name?: string
    type?: "submit" | "reset" | "button"
}

export interface FormCommonProps<T> extends CommonProps<T> {
    acceptCharset?: string
    action?: string
    encType?: string
    method?: string
    name?: string
    noValidate?: boolean
    target?: string
}

export interface InputCommonProps<T> extends CommonProps<T> {
    defaultChecked?: boolean
    defaultValue?: string | number | string[]
    autoComplete?: string
    autoFocus?: boolean
    checked?: boolean
    disabled?: boolean
    form?: string
    list?: string
    max?: number | string
    maxLength?: number
    min?: number | string
    minLength?: number
    multiple?: boolean
    name?: string
    pattern?: string
    placeholder?: string
    readOnly?: boolean
    required?: boolean
    type?: string
    value?: string | string[] | number
    onChange?: ChangeEventHandler<T>
}