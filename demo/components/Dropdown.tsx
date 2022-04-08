import * as React from "react"
import Dropdown from "../../src/Dropdown"

export default () => (
    <div>
        <Dropdown.Menu
            dark
            header="Dropdown menu"
            className="show">
            <Dropdown.Item text>Dropdown item text</Dropdown.Item>
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Something else here</Dropdown.Item>
        </Dropdown.Menu>
    </div>
)