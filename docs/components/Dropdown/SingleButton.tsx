import * as React from "react";
import { Dropdown } from "reap-ui";

export default () => {
    const overlay = (
        <Dropdown.Menu>
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item>
        </Dropdown.Menu>
    );

    return (
        <Dropdown.Button
            variant="secondary"
            overlay={overlay}>
            Dropdown button
        </Dropdown.Button>
    )
};