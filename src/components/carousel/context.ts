import {createContext} from "react"

interface CarouselContext {
    slide: boolean
}

export default createContext<CarouselContext>({} as CarouselContext)