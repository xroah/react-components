import {createContext} from "react"

export interface TriggerContext {
    hide?: VoidFunction
    show?: VoidFunction
    toggle?: VoidFunction
    visible?: boolean
}

export default createContext<TriggerContext>({})