import Carousel from "./Carousel"
import Item from "./item"

const C = Carousel as (typeof Carousel & {Item: typeof Item})

C.Item = Item

export default C