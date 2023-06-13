import {createContext} from "react"

interface CarouselContext {
    dir: string
    slide: boolean
    onSlid: VoidFunction
    onSlide: VoidFunction
}

export default createContext<CarouselContext>({} as CarouselContext)