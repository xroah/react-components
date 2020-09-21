import Accordion from "./Accordion"
import Panel from "./Panel"
import Collapse from "./Collapse"

type AccordionType = typeof Accordion & { Panel: typeof Panel }

const _Accordion = Accordion as AccordionType

_Accordion.Panel = Panel

export {
    _Accordion as Accordion,
    Collapse
}