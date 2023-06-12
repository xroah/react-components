import C from  "./carousel"
import Item from "./item"

type CType = typeof C & {
    Item: typeof Item
}

const Carousel = C as CType
Carousel.Item = Item

export default Carousel