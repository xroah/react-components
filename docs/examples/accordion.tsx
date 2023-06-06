import Accordion from "r-components/accordion"
import React from "react"

export default function AccordionExample() {
    return (
        <Accordion activeKey={["a", "c"]}>
            <button>111</button>
            {1}
            <Accordion.Item key="a">

            </Accordion.Item>
            <Accordion.Item key="b">

            </Accordion.Item>
            <Accordion.Item key="c">

            </Accordion.Item>
        </Accordion>
    )
}