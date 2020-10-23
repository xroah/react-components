import {createContext} from "react"

export const AccordionContext = createContext(new Set())

export const FormContext = createContext({
    labelCol: null,
    labelAlign: "left",
    wrapperCol: null,
    horizontal: false
} as any)

export const InputGroupContext = createContext(false)

export const TabContext = createContext({
    activeKey: "",
    fade: true,
    previousKey: "" //handle next tab active after previous fade out
})

export const ModalContext = createContext({
    isModal: false,
    visible: false
})

export const PopupContext = createContext({
    arrowLeft: 0,
    arrowTop: 0,
    placement: ""
})

export const NavbarContext = createContext(false)

export const DropdownContext = createContext({
    close: () => {}
})

export const ToggleButtonGroupContext = createContext({
    type: ""
})

export const ListGroupContext = createContext(false)

export const FormItemContext = createContext({
    valid: null,
    invalid: null,
    tooltip: false,
    help: null
} as any)