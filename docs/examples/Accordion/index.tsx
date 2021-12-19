import * as React from "react"
import Accordion from "reap-ui/Accordion"

export default () => (
    <div className="my-3">
        <Accordion 
        defaultOpen={2} 
        onChange={v => console.log("changed", v)}>
            <Accordion.Item key={1} title="Accordion Item #1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi enim, unde quisquam itaque voluptatibus pariatur eveniet nobis magni voluptas esse quis culpa quia harum perspiciatis a maxime error assumenda nesciunt?
            </Accordion.Item>
            <Accordion.Item key={2} title="Accordion Item #2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ipsum dolor qui nisi asperiores reprehenderit, distinctio excepturi a consequuntur veniam obcaecati molestiae sit beatae at. Officia corporis provident ut voluptatum!
            </Accordion.Item>
            <Accordion.Item key={3} title="Accordion Item #3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odio repellendus iure ea. Dicta quia eum recusandae exercitationem aliquid esse possimus neque asperiores repellendus atque, suscipit vel totam animi optio?
            </Accordion.Item>
        </Accordion>
    </div>
)