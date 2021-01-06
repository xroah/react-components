import * as React from "react"
import { Accordion } from "reap-ui"

export default () => (
    <Accordion defaultActiveKey="0">
        <Accordion.Panel header="Panel1" key="0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo molestiae iusto eius, tempore pariatur et alias tenetur, veniam placeat dolorum est sed in quasi culpa deleniti. Hic quia ea minus?
        </Accordion.Panel>
        <Accordion.Panel header="Panel2" key="1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti distinctio deleniti quasi consequatur repellendus provident. Itaque a deleniti sunt debitis rerum in ipsa, architecto eos quam commodi perspiciatis necessitatibus consequuntur.
        </Accordion.Panel>
        <Accordion.Panel header="Panel3" key="2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius totam maiores impedit vitae pariatur et suscipit inventore dolore voluptates quam, assumenda cumque cupiditate neque atque amet! Suscipit laudantium nisi non!
        </Accordion.Panel>
    </Accordion>
)