import * as React from "react";
import { Dropdown, Button } from "reap-ui";

function Overlay() {
    const context = React.useContext(Dropdown.Context);
    const close = () => context.close();

    return (
        <div style={
            {
                width: 200,
                padding: 10,
                color: "#fff",
                backgroundColor: "rgba(0, 0, 180, .6)",
            }
        }>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime, illo perspiciatis omnis itaque commodi esse voluptatem tenetur obcaecati porro totam necessitatibus sit. Quis illo laudantium repellat nesciunt blanditiis odit illum.
            <div>
                <Button variant="danger" onClick={close}>Close</Button>
            </div>
        </div>);
}

export default () => (
    <Dropdown overlay={<Overlay />} offset={[0, 5]}>
        <a href="#">Custom dropdown</a>
    </Dropdown>
);