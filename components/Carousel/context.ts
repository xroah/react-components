import {createContext} from "react"
import {ContextObject} from "./types"

export default createContext<ContextObject>({
    activeIndex: 0
})