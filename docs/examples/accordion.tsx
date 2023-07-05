import Accordion from "r-components/accordion"
import React from "react"

export default function AccordionExample() {
    return (
        <Accordion
            flush
            alwaysOpen
            defaultActiveKey={["a", "c"]}
            onChange={k => console.log("Active tab: ", k)}>
            <button>111</button>
            <Accordion.Item itemKey="a" title="Accordion Item#1">
                This is the first item&lsquo;s accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&lsquo;s also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.
            </Accordion.Item>
            <Accordion.Item itemKey="b" title="Accordion Item#2">
                This is the second item&lsquo;s accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&lsquo;s also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.
            </Accordion.Item>
            <Accordion.Item itemKey="c" title="Accordion Item#3">
                This is the third item&lsquo;s accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It&lsquo;s also worth noting that just about any HTML can go within the .accordion-body, though the transition does limit overflow.
            </Accordion.Item>
            {1}
        </Accordion>
    )
}