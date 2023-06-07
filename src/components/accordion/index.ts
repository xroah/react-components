import A from "./accordion"
import Item from "./item"

type AccordionType = typeof A & {
    Item: typeof Item
}

const Accordion = A as AccordionType
Accordion.Item = Item

export default Accordion