import {Key, createContext} from "react"

interface ContextType {
    activeKey: Key
    setActive: (k: Key) => void
}

export default createContext<ContextType>({} as unknown as ContextType)