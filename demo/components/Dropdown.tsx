import * as React from "react"
import Dropdown from "../../src/Dropdown"
import Trigger from "../../src/Overlay/Trigger"

export default () => (
    <div>
        <Trigger
            fade={false}
            alignment="end"
            overlay={
                <Dropdown.Menu
                    dark
                    header="Dropdown menu">
                    <Dropdown.Item text>Dropdown item text</Dropdown.Item>
                    <Dropdown.Item>Action</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Something else here</Dropdown.Item>
                </Dropdown.Menu>
            }>
            <button style={{width: 300}}>trigger</button>
        </Trigger>

    </div>
)