import Accordion from "./Accordion";
import Panel from "./Panel";

type AccordionType = typeof Accordion & { Panel: typeof Panel };

const _Accordion = Accordion as AccordionType;

_Accordion.Panel = Panel;

export default _Accordion;