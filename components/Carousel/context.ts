import {createContext} from "react"
import {CarouselState} from "./types"

export default createContext<CarouselState>({
    activeIndex: 0
})