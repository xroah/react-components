import * as React from "react"
import {
    Dropdown, Button 
} from "reap-ui"

export default () => {
    const [visible, updateVisible] = React.useState(false)
    const toggle = e => {
        updateVisible(!visible)
        e.preventDefault()
    }

    const overlay = (
        <div style={
            {
                width: 200,
                padding: 10,
                color: "#fff",
                backgroundColor: "rgba(0, 0, 180, .6)"
            }
        }>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, illo perspiciatis omnis itaque commodi esse voluptatem tenetur obcaecati porro totam necessitatibus sit. Quis illo laudantium repellat nesciunt blanditiis odit illum.
            <div>
                <Button variant="danger" onClick={toggle}>Close</Button>
            </div>
        </div>
    )

    return (
        <Dropdown overlay={overlay} visible={visible} offset={[0, 5]}>
            <a href="#" onClick={toggle}>Custom dropdown</a>
        </Dropdown>
    )
}