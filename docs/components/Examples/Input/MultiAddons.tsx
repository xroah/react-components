import * as React from "react";
import { Input } from "reap-ui";

const addons = (
    <>
        <Input.Text>$</Input.Text>
        <Input.Text>.00</Input.Text>
    </>
);

export default () => (
    <>
        <Input prepend={addons} />
        <Input append={addons} />
    </>
);