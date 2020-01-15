import * as React from "react";
import { Dropdown } from "reap-ui";

export default () => (
    <>
        <div style={{ height: 800, backgroundColor: "skyblue" }}>test</div>
        <Dropdown.Button align="center" placement="top" overlay={
            <Dropdown.Menu header="Menu header">
                <Dropdown.MenuItem tag="button">Action</Dropdown.MenuItem>
                <Dropdown.MenuItem disabled tag="button">Another action</Dropdown.MenuItem>
                <Dropdown.MenuItem tag="button">Something else here</Dropdown.MenuItem>
            </Dropdown.Menu>
        } className="mb-3 mt-3">
            Dropdown
        </Dropdown.Button>
        <div style={{ height: 800, backgroundColor: "indigo" }}>test</div>
        <Dropdown.Button overlay={
            <Dropdown.Menu header="Menu header">
                <Dropdown.MenuItem tag="button">Action</Dropdown.MenuItem>
                <Dropdown.MenuItem disabled tag="button">Another action</Dropdown.MenuItem>
                <Dropdown.MenuItem tag="button">Something else here</Dropdown.MenuItem>
            </Dropdown.Menu>
        } className="mb-3 mt-3" split size="lg" fade={false}>
            Button
        </Dropdown.Button>
        <div style={{ height: 800, backgroundColor: "tan" }}>test</div>
    </>
);