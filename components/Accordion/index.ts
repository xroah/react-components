import Accordion from "./Accordion"
import Item from "./Item"

interface AccordionType {
    Item: typeof Item
}

const A = <typeof Accordion & AccordionType>Accordion

A.Item = Item

export default A